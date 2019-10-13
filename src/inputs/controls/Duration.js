import React from 'react';
import PropTypes from "prop-types";
import {FastField} from "formik";
import {Form, InputGroup, Col, OverlayTrigger, Tooltip, Button} from "react-bootstrap";
import {validateMandatory} from "./util";
import _ from "lodash";

const generateFields = (field, form, control, path, translate) => {
    let keys = {
        years: {min: 0, max: 10},
        months: {min: 0, max: 12},
        days: {min: 0, max: 31},
        hours: {min: 0, max: 24},
        minutes: {min: 0, max: 60},
        seconds: {min: 0, max: 60}
    };
    return Object.keys(keys).map((key) => {
        return <Form.Control
            {...field}
            key={`${path}${key}`}
            value={field.value ? field.value[key] : ''}
            onChange={(e) => {
                if (e.target.value) {
                    let obj = {
                        path: control.contributionPath,
                        type: control.type
                    };
                    obj[key] = e.target.value;
                    let result = Object.assign({}, field.value, obj);
                    result.formattedValue = formatValue(result);
                    console.log(result);
                    form.setFieldValue(path, result);
                    console.log(field.value);
                } else {
                    form.handleChange(e)
                }
            }}
            type="number"
            min={keys[key].min}
            max={keys[key].max}
            placeholder={translate(key)}
            aria-describedby="inputGroupAppend"
            isInvalid={_.get(form.errors, path) && _.get(form.touched, path)}
        />
    })
};

const formatValue = (value) => {
    return `P${value.years ? `${value.years}Y` : ''}${value.months ? `${value.months}M` : ''}${value.days ? `${value.days}D` : ''}T${value.hours ? `${value.hours}H` : ''}${value.minutes ? `${value.minutes}M` : ''}${value.seconds ? `${value.seconds}S` : ''}`
};

const validateDuration = (value, occurrences, translate) => {
    let error = "";
    error = validateMandatory(value, occurrences, translate);
    return error;
};

const Duration = (props) => (
    <FastField name={props.path}
               validate={(value) => {
                   return validateDuration(value, props.control.occurrences, props.translate)
               }}
               render={
                   ({field, form}) => {
                       if (props.path) props.setInitialValues(props.path);
                       return (
                           <Form.Group as={Col} controlId={props.path}>
                               <InputGroup>
                                   {generateFields(field, form, props.control, props.path, props.translate)}
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


Duration.propTypes = {
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
export default Duration