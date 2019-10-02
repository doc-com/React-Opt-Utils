import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Control from "./Control";

import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import DynamicComponent from "./DynamicComponent";

const renderContent = (section, translate) => {

    let sectionArray = section.sections.map((section) => {
        section.itemType = "section";
        return section;
    });

    let controlArray = section.controls.map((control) => {
        control.itemType = "control";
        return control;
    });

    let contentArray = sectionArray.concat(controlArray);

    contentArray.sort((item1, item2) => {
        if (item1.orderInParent > item2.orderInParent) return 1;
        if (item1.orderInParent < item2.orderInParent) return -1;
        if (item1.orderInParent === item2.orderInParent) return 0
    });

    return contentArray.map((item) => {

        if (item.itemType === "section") {
            if (item.occurrences.upper_unbounded) {
                return <DynamicComponent content={item} key={item.header + item.orderInParent}
                                         translate={translate}/>
            }
            return <Section section={item} key={item.header + item.orderInParent}
                            translate={translate}/>
        }

        if (item.itemType === "control") {
            if (item.occurrences.upper_unbounded) {
                return <DynamicComponent content={item} key={item.id}
                                         translate={translate}/>
            }
            return <Control control={item} key={item.id}
                            translate={translate}/>
        }
    })

};

const Section = (props) => {
    return (
        <Accordion>
            <Card>
                <Accordion.Toggle as={Card.Header} variant="primary" eventKey="0">
                    {props.section.header}
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                    <Card.Body>{renderContent(props.section, props.translate)}</Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion>
    )
};

Section.propTypes = {
    section: PropTypes.shape({
        header: PropTypes.string.isRequired,
        controls: PropTypes.arrayOf(PropTypes.any),
        sections: PropTypes.arrayOf(PropTypes.any),
        occurrences: PropTypes.shape({
            lower_included: PropTypes.bool,
            upper_included: PropTypes.bool,
            lower_unbounded: PropTypes.bool,
            upper_unbounded: PropTypes.bool,
            lower: PropTypes.number,
            upper: PropTypes.number,
        }),
        termDefinitions: PropTypes.any,
        orderInParent: PropTypes.number
    }),
    translate: PropTypes.func.isRequired
};
export default Section;