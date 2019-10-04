import React from 'react';
import PropTypes from "prop-types";
import ControlType from "./ControlType";
import InvalidInput from "./InvalidInput";
import {Field} from "formik";

const OptInput = (props) => {
    let content =
        //<Field type="text" name={props.path} />;

        <Field
            name={props.path}
            render={({field}) => (
                <input {...field}/>)}
        />;

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

OptInput.propTypes = {
    form: PropTypes.any,
    dynamicId: PropTypes.bool,
    control: PropTypes.shape({
        id: PropTypes.string.isRequired,
        path: PropTypes.string.isRequired,
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