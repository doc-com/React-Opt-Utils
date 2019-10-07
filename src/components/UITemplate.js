import React from 'react';
import PropTypes from 'prop-types';
import Section from "./Section";
import {Form, Formik} from "formik";
import Button from "react-bootstrap/Button";

const UITemplate = (props) => {
    return (
        <div className={"mt-3"}>
            <Formik
                onSubmit={(values, actions) => {
                    console.log(flattenForm(values));
                }}
                render={({handleSubmit, handleChange, handleBlur, values, errors}) =>
                    (<Form>
                        {props.template.sections.map((section) =>
                            <Section path={section.header}
                                     form={{handleSubmit, handleChange, handleBlur, values, errors}}
                                     key={section.header + section.orderInParent}
                                     section={section} translate={props.translate}
                                     isDynamic={false}/>)}
                        <Button type={"submit"}/>
                    </Form>)
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
        if (result[element.path]) {
            if (Array.isArray(result[element.path])) {
                result[element.path].push(element.value)
            } else {
                let val = result[element.path];
                result[element.path] = [val]
            }
        } else {
            result[element.path] = element.value ? element.value : 'empty'
        }
    } else {
        if (Array.isArray(element)) {
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

UITemplate.propTypes = {
    template: PropTypes.shape({
        concept: PropTypes.string,
        sections: PropTypes.arrayOf(PropTypes.any)
    })
};
export default UITemplate;