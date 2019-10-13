import React from 'react';
import PropTypes from "prop-types";
import {FastField} from "formik";
import {Form, InputGroup, Col, OverlayTrigger, Tooltip, Button} from "react-bootstrap";
import {validateMandatory} from "./util";
import _ from "lodash";

const validateCount = (value, range, occurrences, translate) => {

    let error = "";
    if (range && range.lower_included && value < range.lower) {
        //TODO Replace for translatable key in Medical Heroes
        error = translate('Value too low');
    }

    if (!error && (range && range.upper_included && value > range.upper)) {
        //TODO Replace for translatable key in Medical Heroes
        error = translate('Value too big');
    }

    if (!error) {
        error = validateMandatory(value, occurrences, translate);
    }

    return error;
};

const Count = (props) => (
    <FastField name={props.path}
               validate={(value) => {
                   return validateCount(value, props.control.range, props.control.occurrences, props.translate)
               }}
               render={
                   ({field, form}) => {
                       if(props.path)props.setInitialValues(props.path);
                       let range = props.control.range ? props.control.range : '';
                       return (
                           <Form.Group as={Col} controlId={props.path}>
                               <InputGroup>
                                   <InputGroup.Prepend>
                                       <InputGroup.Text>{props.control.label}</InputGroup.Text>
                                   </InputGroup.Prepend>
                                   <Form.Control
                                       {...field}
                                       value={field.value ? field.value.count : ''}
                                       onChange={(e) => {
                                           if (e.target.value) {
                                               form.setFieldValue(props.path, {
                                                   path: props.control.contributionPath,
                                                   count: e.target.value,
                                                   type: props.control.type
                                               });
                                           } else {
                                               form.handleChange(e)
                                           }
                                       }}
                                       type="number"
                                       min={(range && range.lower_included) ? range.lower : -10000}
                                       max={(range && range.upper_included) ? range.upper : 10000}
                                       placeholder={props.control.label}
                                       aria-describedby="inputGroupAppend"
                                       isInvalid={_.get(form.errors, props.path) && _.get(form.touched, props.path)}
                                   />
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
                                       {_.get(form.errors, props.path)}
                                   </Form.Control.Feedback>
                               </InputGroup>
                           </Form.Group>
                       );
                   }
               }/>
);


Count.propTypes = {
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
export default Count