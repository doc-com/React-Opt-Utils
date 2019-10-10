import React from 'react';
import PropTypes from "prop-types";
import {FastField} from "formik";
import {Form, InputGroup, Col, OverlayTrigger, Tooltip, Button} from "react-bootstrap";
import {validateMandatory} from "./util";
import _ from "lodash";

const validateInternalText = (value, occurrences, translate) => {
    let error;
    error = validateMandatory(value, occurrences, translate);
    return error;
};

const InternalCodedText = (props) => (
    <FastField name={props.path}
               validate={(value) => {
                   return validateInternalText(value, props.control.occurrences, props.translate)
               }}
               render={
                   ({field, form}) => {
                       //TODO Replace for translatable key in Medical Heroes
                       return (
                           <Form.Group as={Col} controlId={props.path}>
                               <InputGroup>
                                   <Form.Control as="select"
                                                 {...field}
                                                 value={field.value ? JSON.stringify(field.value.code) : ''}
                                                 onChange={(e) => {
                                                     if (e.target.value) {
                                                         let selectedEntry = props.control.codeList.filter((entry) => {
                                                             return entry.code === e.target.value
                                                         });
                                                         if (selectedEntry && selectedEntry[0]) {
                                                             form.setFieldValue(props.path, {
                                                                 path: props.control.contributionPath,
                                                                 code: selectedEntry[0].code,
                                                                 textValue: selectedEntry[0].text
                                                             })
                                                         }
                                                     } else {
                                                         form.handleChange(e)
                                                     }
                                                 }}
                                                 aria-describedby="inputGroupAppend"
                                                 isInvalid={!!_.get(form.errors, props.path) && _.get(form.touched, props.path)}>
                                       {[<option hidden disabled selected
                                                 value={""} key={`${props.path}-opt-1`}>{props.translate('-- Select an option --')}</option>, ...props.control.codeList.map(
                                           (item, index) => <option key={`${props.path}-opt${index}`}
                                                                    value={item.code}>{item.text}</option>)]}
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
                                       {_.get(form.errors, props.path)}
                                   </Form.Control.Feedback>
                               </InputGroup>
                           </Form.Group>
                       );
                   }
               }/>
);


InternalCodedText.propTypes = {
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
export default InternalCodedText