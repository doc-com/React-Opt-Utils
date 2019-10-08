import React from 'react';
import PropTypes from "prop-types";
import {FastField} from "formik";
import {validateMandatory} from "./util";

const validateFreeText = (value, occurrences, translate) => {
    let error;
    error = validateMandatory(value, occurrences, translate);
    return error;
};

const FreeText = (props) => (
    <FastField name={props.path}
               validate={(value) => {
                   return validateFreeText(value, props.control.occurrences, props.translate)
               }}
               render={

                   ({field, form}) => {
                       console.log(field)
                       return (<div>
                           <input {...field}
                                  value={field.value ? field.value.value : ''}
                                  onChange={(e) => {
                                      form.handleChange(e);
                                      form.setFieldValue(props.path, {
                                          path: props.control.contributionPath,
                                          value: e.target.value
                                      })
                                  }}
                           />
                           {field.touched[field.name] &&
                           form.errors[field.name] && <div className="error">{form.errors[field.name]}</div>}
                       </div>)
                   }
               }/>
);


FreeText.propTypes = {
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
export default FreeText