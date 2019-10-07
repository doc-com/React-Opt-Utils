import React from 'react';
import PropTypes from "prop-types";
import ControlType from "./ControlType";
import InvalidInput from "./InvalidInput";
import {FastField, Field} from "formik";

const OptInput = (props) => {
    let content =
        //<Field type="text" name={props.path} />;

        <FastField
            name={props.path}
            render={({field, form}) => {
                //console.log(field);
                //console.log(form);
                if (!field.value) {
                    form.setFieldValue(props.path, {path: props.control.contributionPath, value: randomString(10)});
                }
                return (
                    <input {...field}
                           value={field.value ? field.value.value : ''}
                        //value={randomString(10)}
                           onChange={(e) => {
                               form.handleChange(e);
                               form.setFieldValue(props.path, {
                                   path: props.control.contributionPath,
                                   value: e.target.value
                               })
                           }}
                    />)
            }}
        />
    ;

    /*

    <input readOnly value={Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)}/>;
    switch (props.control.type) {
        case ControlType.FREE_TEXT:
            content = (
                <Field type="text" name={props.path} placeholder={props.control.label}/>);

            break;
        case ControlType.INTERNAL_CODED_TEXT:
            break;
        case ControlType.EXTERNAL_CODED_TEXT:
            break;
        case ControlType.CONSTRAINED_TEXT:
            break;
        case ControlType.QUANTITY:
            break;
        case ControlType.COUNT:
            break;
        case ControlType.DATE:
            break;
        case ControlType.DATETIME:
            break;
        case ControlType.ORDINAL:
            break;
        case ControlType.BOOLEAN_CHECK:
            break;
        case ControlType.DURATION:
            break;
        default:
            content = <InvalidInput/>;
            break;
    }*/
    return content
};

const randomString = (length) => {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};

OptInput.propTypes = {
    form: PropTypes.any,
    dynamicId: PropTypes.bool,
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
export default OptInput;