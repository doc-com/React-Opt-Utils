import React from 'react';
import PropTypes from 'prop-types';
import Section from "./Section";
import {Form, Formik} from "formik";
import {Form as BootstrapForm} from "react-bootstrap";
import Button from "react-bootstrap/Button";

const UITemplate = (props) => {
    return (
        <div className={"mt-3"}>
            <Formik
                onSubmit={(values, actions) => {
                    console.log(values);
                    let results = flattenForm(values);
                    console.log(JSON.stringify(results));
                }}
                initialValues={{}}
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
                            <Section path={section.header}
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
        result[element.path] = element.value ? element.value : 'empty'
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