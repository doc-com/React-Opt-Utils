import React from 'react';
import PropTypes from 'prop-types';
import Section from "./Section";
import {Form, Formik} from "formik";

const UITemplate = (props) => {
    return (
        <div className={"mt-3"}>
            <Formik
                onSubmit={(values, actions) => {

                }}
                render={({handleSubmit, handleChange, handleBlur, values, errors}) =>
                    (<Form>
                        {props.template.sections.map((section) =>
                            <Section form={{handleSubmit, handleChange, handleBlur, values, errors}}
                                     key={section.header + section.orderInParent}
                                     section={section} translate={props.translate}
                                     isDynamic={false}/>)}
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