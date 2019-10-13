import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Section from "./Section";
import {Formik} from "formik";
import {Form as BootstrapForm} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import ControlType from "../inputs/ControlType";

const UITemplate = (props) => {
    return (
        <div className={"mt-3"}>
            <Formik
                onSubmit={(values, actions) => {
                    console.log(values);
                    let results = flattenForm(values);
                    console.log(JSON.stringify(results));
                    console.log(props.initialValues)
                }}
                initialValues={props.initialValues}
                render={({
                             handleSubmit,
                             handleChange,
                             handleBlur,
                             values,
                             touched,
                             isValid,
                             errors
                         }) =>
                    (<BootstrapForm noValidate onSubmit={handleSubmit}>
                        {props.template.sections.map((section) =>
                            <Section
                                setInitialValues={props.setInitialValues}
                                path={section.header}
                                key={section.header + section.orderInParent}
                                section={section} translate={props.translate}
                                isDynamic={false}/>)}
                        <Button className={"mt-3"} type={"submit"} variant="success">Submit</Button>
                    </BootstrapForm>)
                }/>
        </div>
    )
};

const flattenForm = (values) => {
    let result = {};
    flattenObject(values, result);
    return result;
};

const flattenObject = (element, result) => {
    if (element.path) {
        setValueByType(element, result)
    } else {
        if (Array.isArray(element)) {

            element.forEach((item, index) => {
                replaceIndexInPath(item, index)
            });

            element.forEach((item) => {
                flattenObject(item, result)
            })
        } else {
            Object.keys(element).forEach((key) => {
                console.log(key);
                flattenObject(element[key], result)
            })

        }
    }

};

const setValueByType = (element, result) => {
    console.log(element);
    switch (element.type) {
        case ControlType.FREE_TEXT:
            result[`${element.path}/value`] = element.textValue ? element.textValue : 'empty';
            break;
        case ControlType.INTERNAL_CODED_TEXT:
            result[`${element.path}/value`] = element.textValue ? element.textValue : 'empty';
            result[`${element.path}/defining_code/terminology_id/value`] = 'local';
            result[`${element.path}/defining_code/code_string`] = element.code ? element.code : 'empty';
            break;
        case ControlType.EXTERNAL_CODED_TEXT:
            result[`${element.path}/value`] = element.textValue ? element.textValue : 'empty';
            result[`${element.path}/defining_code/terminology_id/value`] = 'SNOMED-CT';
            result[`${element.path}/defining_code/code_string`] = element.code ? element.code : 'empty';
            break;
        case ControlType.CONSTRAINED_TEXT:
            result[`${element.path}/value`] = element.textValue ? element.textValue : 'empty';
            result[`${element.path}/defining_code/terminology_id/value`] = 'SNOMED-CT';
            result[`${element.path}/defining_code/code_string`] = element.code ? element.code : 'empty';
            break;
        case ControlType.QUANTITY:
            result[`${element.path}/magnitude`] = element.magnitude ? element.magnitude : 'empty';
            result[`${element.path}/units`] = element.units ? element.units : 'empty';
            break;
        case ControlType.COUNT:
            result[`${element.path}/magnitude`] = element.count ? element.count : 'empty';
            break;
        case ControlType.DATE:
            result[`${element.path}/value`] = element.date ? element.date.toISOString() : 'empty';
            break;
        case ControlType.DATETIME:
            result[`${element.path}/value`] = element.date ? element.date.toISOString() : 'empty';
            break;
        case ControlType.ORDINAL:
            result[`${element.path}/value`] = element.ordinalValue ? element.ordinalValue : 'empty';
            result[`${element.path}/symbol/value`] = element.textValue ? element.textValue : 'empty';
            result[`${element.path}/symbol/defining_code/terminology_id/value`] = element.terminologyId ? element.terminologyId : 'empty';
            result[`${element.path}/symbol/defining_code/code_string`] = element.code ? element.code : 'empty';
            break;
        case ControlType.BOOLEAN_CHECK:
            result[`${element.path}/value`] = element.value ? element.value : 'empty';
            break;
        case ControlType.DURATION:
            result[`${element.path}/value`] = element.formattedValue ? element.formattedValue : 'empty';
            break;
        default:
            break;
    }

};

const replaceIndexInPath = (item, index) => {
    if (item.path) {
        item.path = item.path.replace("%index%", index)
    } else {
        if (Array.isArray(item)) {
            item.forEach((item) => {
                replaceIndexInPath(item, index)
            });
        } else {
            Object.keys(item).forEach((key) => {
                replaceIndexInPath(item[key], index)
            })
        }
    }
};

UITemplate.propTypes = {
    template: PropTypes.shape({
        concept: PropTypes.string,
        sections: PropTypes.arrayOf(PropTypes.any)
    })
};
export default UITemplate;