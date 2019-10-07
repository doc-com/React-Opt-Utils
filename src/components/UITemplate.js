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
                    console.log(values);
                    let results = flattenForm(values);
                    let filteredResults = {};
                    Object.keys(results).forEach((key) => {
                        if (key.includes("/version/data[@archetype_node_id='openEHR-EHR-COMPOSITION.soap.v0']/content[@archetype_node_id='openEHR-EHR-SECTION.soap.v0']/items[@archetype_node_id='openEHR-EHR-OBSERVATION.soap_s.v0']/data[@archetype_node_id='at0001']/events[@archetype_node_id='at0002']/data[@archetype_node_id='at0003']/items[@archetype_node_id='at0050']")) {
                            filteredResults[key] = results[key]
                        }
                    });
                    console.log(results);
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
        console.log("------------------Found Value-------------");
        console.log(element);
        console.log("------------------------------------------");
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