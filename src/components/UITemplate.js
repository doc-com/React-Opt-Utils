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
                    console.log(values)
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

UITemplate.propTypes = {
    template: PropTypes.shape({
        concept: PropTypes.string,
        sections: PropTypes.arrayOf(PropTypes.any)
    })
};
export default UITemplate;