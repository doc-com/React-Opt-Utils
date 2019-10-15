import React from 'react';
import PropTypes from "prop-types";
import {FastField} from "formik";
import {Form, InputGroup, Col, OverlayTrigger, Tooltip, Button} from "react-bootstrap";
import {validateMandatory} from "./util";
import {KeyboardDatePicker} from "@material-ui/pickers";
import moment from "moment";
import _ from "lodash";

const validateDate = (value, datePattern, range, occurrences, translate) => {
    let error = "";
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
                       const currentError = _.get(form.errors, props.path);
                       if (props.path) props.setInitialValues(props.path);
                       return (
                           <Form.Group as={Col} controlId={props.path}>
                               <InputGroup>
                                   <KeyboardDatePicker
                                       className={"mt-1"}
                                       clearable
                                       name={field.name}
                                       value={field.value ? field.value.date : null}
                                       format="DD/MM/YYYY"
                                       placeholder={props.translate('Enter date')}
                                       views={["year", "month", "date"]}
                                       helperText={currentError}
                                       error={Boolean(_.get(form.errors, props.path) && _.get(form.touched, props.path))}
                                       onError={error => {
                                           // handle as a side effect
                                           if (error !== currentError) {
                                               let err = _.get(form.touched, props.path) ? validateDate(field.value, props.control.datePattern, props.control.range, props.control.occurrences, props.translate) : '';
                                               form.setFieldError(field.name, err ? err : error);
                                           }
                                       }}
                                       minDate={(props.control.range && props.control.range.lower_included) ? moment(props.control.range.lower) : moment("1900-01-01")}
                                       maxDate={(props.control.range && props.control.range.upper_included) ? moment(props.control.range.upper) : moment().add(1, 'y')}
                                       onChange={date => form.setFieldValue(field.name, {
                                           path: props.control.contributionPath,
                                           date,
                                           type: props.control.type
                                       }, true)}
                                   />
                                   <OverlayTrigger
                                       placement={'bottom'}
                                       overlay={
                                           <Tooltip
                                               id={`tooltip-bottom`}>{props.control.description}</Tooltip>
                                       }>
                                       <Button
                                           className={`ml-2 ${Boolean(_.get(form.errors, props.path) && _.get(form.touched, props.path)) ? "mb-3" : ''}`}
                                           variant="secondary">?</Button>
                                   </OverlayTrigger>
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