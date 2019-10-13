import React from 'react';
import PropTypes from 'prop-types';
import OptInput from "../inputs/OptInput";
import {Container} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Control = (props) => {
    //console.log(props.form);
    props.setInitialValues();
    return (
        <Container>
            <Row className={"align-items-center"}>
                <Col md={"auto"}>
                    {props.control.label}
                </Col>
                {props.isDynamic ?
                    <i className="fas fa-trash" onClick={(e) => {
                        e.preventDefault();
                        props.deleteContentItem(props.dynamicId)
                    }}/>
                    : ''}
            </Row>
            <Row>
                <OptInput setInitialValues={props.setInitialValues} path={props.path} isDynamic={props.isDynamic}
                          control={props.control}
                          translate={props.translate}/>
            </Row>
        </Container>
    )
};

Control.propTypes = {
    path: PropTypes.string.isRequired,
    isDynamic: PropTypes.bool,
    dynamicId: PropTypes.string,
    dynamicIndex: PropTypes.number,
    deleteContentItem: PropTypes.func,
    setInitialValues: PropTypes.func.isRequired,
    control: PropTypes.shape({
        id: PropTypes.string.isRequired,
        path: PropTypes.string.isRequired,
        contributionPath: PropTypes.string.isRequired,
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