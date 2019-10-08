import React from 'react';
import PropTypes from "prop-types";
import ControlType from "./ControlType";
import InvalidInput from "./InvalidInput";
import FreeText from "./controls/FreeText";
import {FastField} from "formik";

const OptInput = (props) => {
    let content = <FastField name={props.path}
                             render={
                                 ({field, form}) => {
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
                                     </div>)
                                 }
                             }/>;
    /*
    switch (props.control.type) {
        case ControlType.FREE_TEXT:
            //content = <FreeText control={props.control} translate={props.translate} path={props.path}/>;
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