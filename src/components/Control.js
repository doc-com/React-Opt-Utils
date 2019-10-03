import React from 'react';
import PropTypes from 'prop-types';
import {Field} from "formik";

const renderContent = (control) => {
    //switch () {

    //}
    return ''
};

const Control = (props) => {
    return (
        <Field
            name={props.control.label}
            render={({field}) => {
                return (<div>
                    <label htmlFor={props.control.label}>
                        {props.control.label}
                    </label>
                    {renderContent(props)}
                </div>)
            }}
        />

    )
};

Control.propTypes = {
    form: PropTypes.any,
    isDynamic: PropTypes.bool.isRequired,
    dynamicId: PropTypes.number,
    deleteContentItem: PropTypes.func,
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
export default Control;