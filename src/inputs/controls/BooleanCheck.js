import React from 'react';
import PropTypes from "prop-types";
import {FastField} from "formik";
import {Form, InputGroup, Col, OverlayTrigger, Tooltip, Button} from "react-bootstrap";
import {validateMandatory} from "./util";
import _ from "lodash";

const validateBooleanCheck = (value, occurrences, translate) => {
    let error = "";
    error = validateMandatory(value, occurrences, translate);
    return error;
};

const BooleanCheck = (props) => (
    <FastField name={props.path}
               validate={(value) => {
                   return validateBooleanCheck(value, props.control.occurrences, props.translate)
               }}
               render={
                   ({field, form}) => {
                       if (props.path) props.setInitialValues(props.path);
                       return (
                           <Form.Group as={Col} controlId={props.path}>
                               <InputGroup>
                                   <InputGroup.Prepend>
                                       <Form.Check
                                           inline
                                           type="radio"
                                           label={props.translate('True')}
                                           name={props.path}
                                           id={`${props.path}1`}
                                           onChange={(e) => {
                                               form.setFieldValue(props.path, {
                                                   path: props.control.contributionPath,
                                                   value: e.target.value,
                                                   type: props.control.type,
                                                   rmType: props.control.rmTypeName
                                               })
                                           }}
                                           value={true}
                                       />
                                       <Form.Check
                                           inline
                                           type="radio"
                                           label={props.translate('False')}
                                           name={props.path}
                                           id={`${props.path}2`}
                                           onChange={(e) => {
                                               form.setFieldValue(props.path, {
                                                   path: props.control.contributionPath,
                                                   value: e.target.value,
                                                   type: props.control.type,
                                                   rmType: props.control.rmTypeName
                                               })
                                           }}
                                           value={false}
                                       />
                                   </InputGroup.Prepend>
                                   <Form.Control
                                       disabled
                                       value={props.control.label}
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


BooleanCheck.propTypes = {
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
export default BooleanCheck