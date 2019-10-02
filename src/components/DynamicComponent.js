import React, {Component} from 'react';
import Control from "./Control";
import Button from "react-bootstrap/Button";
import Section from "./Section";
import {Col, Container, Row} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";

class DynamicComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contentCount: 0
        }
    }

    render() {

        let contentArray = [];
        let i;
        for (i = 0; i < this.state.contentCount; i++) {
            if (this.props.content.itemType === "section") {
                contentArray.push(<Section section={this.props.content}
                                           key={this.props.content.header + this.props.content.orderInParent + "" + i}
                                           translate={this.props.translate}/>)
            }

            if (this.props.content.itemType === "control") {
                contentArray.push(<Control control={this.props.content} key={this.props.content.id + "" + i}
                                           translate={this.props.translate}/>)
            }
        }
        return (
            <Card>
                <Card.Header>
                    <p>Agregar {this.props.content.header}</p>
                    <Button variant="success" onClick={(event) => {
                        this.setState({contentCount: this.state.contentCount + 1})
                    }}>+</Button>
                </Card.Header>
                <Card.Body>{contentArray}</Card.Body>
            </Card>
    )
    }
}

export default DynamicComponent