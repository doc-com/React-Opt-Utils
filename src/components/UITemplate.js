import React from 'react';
import PropTypes from 'prop-types';
import Section from "./Section";

const UITemplate = (props) => {
    return (
        <div>
            {props.template.sections.map((section) => <Section key={section.header + section.orderInParent}
                                                               section={section} translate={props.translate}/>)}
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