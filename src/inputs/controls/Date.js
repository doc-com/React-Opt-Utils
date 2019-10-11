import React from 'react';
import PropTypes from "prop-types";
import {FastField} from "formik";
import {Form, InputGroup, Col, OverlayTrigger, Tooltip, Button} from "react-bootstrap";
import {validateMandatory} from "./util";
import {DatePicker} from "@material-ui/pickers";

const validateDate = (value, datePattern, range, occurrences, translate) => {

    let error;
    if (datePattern) {

    }

    if (range) {
        if (range.lower_included && value < range.lower) {
            //TODO Replace for translatable key in Medical Heroes
            error = translate('Value too low');
        }

        if (!error && (range.upper_included && value > range.upper)) {
            //TODO Replace for translatable key in Medical Heroes
            error = translate('Value too big');
        }
    }

    if (!error) {
        error = validateMandatory(value, occurrences, translate);
    }

    return error;
};

const Date = (props) => (
    <FastField name={props.path}
               validate={(value) => {
                   return validateDate(value, props.control.datePattern, props.control.occurrences, props.translate)
               }}
               render={
                   ({field, form}) => {
                       console.log(props.control)
                       let range = props.control.range ? props.control.range : '';
                       return (
                           <Form.Group as={Col} controlId={props.path}>
                               <InputGroup>
                                   <DatePicker className={"col"} value={field.value ? field.value.date : null} onChange={(date) => {
                                       console.log(date)
                                   }}/>
                                   <InputGroup.Append className={"ml-3"}>
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

Date.propTypes = {
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
export default Date