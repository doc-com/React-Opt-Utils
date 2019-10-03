import React from 'react';
import PropTypes from 'prop-types';
import Control from "./Control";

import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import DynamicComponent from "./DynamicComponent";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

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
        if (item1.orderInParent === item2.orderInParent) return 0;
        return -2
    });

    return contentArray.map((item) => {

        if (item.itemType === "section") {
            if (item.occurrences.upper_unbounded) {
                return <DynamicComponent content={item} key={item.header + item.orderInParent}
                                         translate={translate}/>
            }
            return <Section section={item} key={item.header + item.orderInParent}
                            translate={translate}
                            isDynamic={false}/>
        }

        if (item.itemType === "control") {
            if (item.occurrences.upper_unbounded) {
                return <DynamicComponent content={item} key={item.id}
                                         translate={translate}/>
            }
            return <Control control={item} key={item.id}
                            translate={translate}
                            isDynamic={false}/>
        }
        return ''
    })

};

const Section = (props) => {
    return (
        <Accordion>
            <Card className={props.section.sections.length <= 1 ? "only-child" : ''}>
                <Card.Header>
                    <Row className={"align-items-center"}>
                        <Col md={"auto"}>
                            <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                {props.section.header}
                            </Accordion.Toggle>
                        </Col>
                        {props.isDynamic ?
                            <i className="fas fa-trash" onClick={(e) => {
                                e.preventDefault();
                                props.deleteContentItem(props.dynamicIndex)
                            }}/>
                            : ''}
                    </Row>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                    <Card.Body>{renderContent(props.section, props.translate)}</Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion>
    )
};

Section.propTypes = {
    isDynamic: PropTypes.bool.isRequired,
    dynamicId: PropTypes.string,
    deleteContentItem: PropTypes.func,
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