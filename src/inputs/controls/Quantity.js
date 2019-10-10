import React from 'react';
import PropTypes from "prop-types";
import {FastField} from "formik";
import {Form, InputGroup, Col, OverlayTrigger, Tooltip, Button} from "react-bootstrap";
import {validateMandatory} from "./util";
import _ from "lodash";

const validateQuantity = (value, quantityItems, occurrences, translate) => {
    let selectedMagnitude = value ? quantityItems.filter((item) => {
        return item.units === value.units
    }) : '';
    let magnitude = selectedMagnitude[0].magnitude;
    let error;

    if (magnitude.lower_included && value.magnitude < magnitude.lower) {
        //TODO Replace for translatable key in Medical Heroes
        error = translate('Value too low');
    }

    if (!error && (magnitude.upper_included && value.magnitude > magnitude.upper)) {
        //TODO Replace for translatable key in Medical Heroes
        error = translate('Value too big');
    }

    if (!error) {
        error = validateMandatory(value.magnitude, occurrences, translate);
    }

    if (!error) {
        error = validateMandatory(value.units, occurrences, translate);
    }

    return error;
};

const Quantity = (props) => (
    <FastField name={props.path}
               validate={(value) => {
                   return validateQuantity(value, props.control.quantityItems, props.control.occurrences, props.translate)
               }}
               render={
                   ({field, form}) => {
                       console.log(form.touched);
                       //console.log(props.control);
                       let selectedMagnitude = field.value ? props.control.quantityItems.filter((item) => {
                           return item.units === field.value.units
                       }) : '';
                       return (
                           <Form.Group as={Col} controlId={props.path}>
                               <InputGroup>
                                   <InputGroup.Prepend>
                                       <InputGroup.Text>{props.control.label}</InputGroup.Text>
                                   </InputGroup.Prepend>
                                   <Form.Control
                                       {...field}
                                       value={field.value ? field.value.magnitude : ''}
                                       onChange={(e) => {
                                           if (e.target.value) {
                                               form.setFieldValue(props.path, {
                                                   path: props.control.contributionPath,
                                                   magnitude: e.target.value,
                                                   units: field.value ? field.value.units : ''
                                               });
                                           } else {
                                               form.handleChange(e)
                                           }
                                       }}
                                       type="number"
                                       min={(selectedMagnitude && selectedMagnitude[0] && selectedMagnitude[0].magnitude.lower_included) ? selectedMagnitude[0].magnitude.lower : -10000}
                                       max={(selectedMagnitude && selectedMagnitude[0] && selectedMagnitude[0].magnitude.upper_included) ? selectedMagnitude[0].magnitude.upper : 10000}
                                       placeholder={props.control.label}
                                       aria-describedby="inputGroupAppend"
                                       isInvalid={!!_.get(form.errors, props.path) && _.get(form.touched, props.path)}
                                   />
                                   <Form.Control as="select"
                                                 {...field}
                                                 value={field.value ? field.value.units : ''}
                                                 onChange={(e) => {
                                                     if (e.target.value) {
                                                         form.setFieldValue(props.path, {
                                                             path: props.control.contributionPath,
                                                             magnitude: field.value ? field.value.magnitude : '',
                                                             units: e.target.value
                                                         })
                                                     } else {
                                                         form.handleChange(e)
                                                     }
                                                 }}
                                                 aria-describedby="inputGroupAppend"
                                                 isInvalid={!!_.get(form.errors, props.path) && _.get(form.touched, props.path)}>
                                       {[<option hidden disabled selected
                                                 value={""}
                                                 key={`${props.path}-opt-1`}>{props.translate('-- Select an option --')}</option>, ...props.control.quantityItems.map(
                                           (item, index) => <option key={`${props.path}-opt${index}`}
                                                                    value={item.units}>{item.units}</option>)]}
                                   </Form.Control>
                                   <InputGroup.Append>
                                       <OverlayTrigger
                                           placement={'bottom'}
                                           overlay={
                                               <Tooltip id={`tooltip-bottom`}>{props.control.description}</Tooltip>
                                           }>
                                           <Button variant="secondary">?</Button>
                                       </OverlayTrigger>
                                   </InputGroup.Append>
                                   <Form.Control.Feedback type="invalid">

                                   </Form.Control.Feedback>
                               </InputGroup>
                           </Form.Group>
                       );
                   }
               }/>
);


Quantity.propTypes = {
    path: PropTypes.string.isRequired,
    control: PropTypes.shape({
        id: PropTypes.string.isRequired,
        path: PropTypes.string.isRequired,
        contributionPath: PropTypes.string.isRequired,
        rmTypeName: PropTypes.string.isRequired,
        occurrences: PropTypes.shape({
            lower_included: PropTypes.bool,
            upper_included: PropTypes.bool,
            lower_unbounded: PropTypes.bool,
            upper_unbounded: PropTypes.bool,
            lower: PropTypes.number,
            upper: PropTypes.number,
        }),
        label: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        orderInParent: PropTypes.number,
        termDefinition: PropTypes.shape({
            text: PropTypes.string,
            description: PropTypes.string,
            comment: PropTypes.string,
        }),
        type: PropTypes.string
    }),
    translate: PropTypes.func.isRequired
};
export default Quantity