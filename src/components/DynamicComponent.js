import React, {Component} from 'react';
import Control from "./Control";
import Button from "react-bootstrap/Button";
import Section from "./Section";
import {Col, Row} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import uuid from "uuid";

class DynamicComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contentArray: []
        }
    }

    addContentItem() {
        let entry;
        if (this.props.content.itemType === "section") {
            entry = <Section section={this.props.content}
                             key={this.props.content.header + this.props.content.orderInParent + "" + uuid.v1()}
                             translate={this.props.translate} isDynamic={true}
                             dynamicIndex={this.state.contentArray.length}
                             deleteContentItem={(index) => {
                                 this.deleteContentItem(index)
                             }}/>
        }

        if (this.props.content.itemType === "control") {
            entry =
                <Control control={this.props.content} key={this.props.content.id + "" + uuid.v1()}
                         translate={this.props.translate} isDynamic={true} dynamicIndex={this.state.contentArray.length}
                         deleteContentItem={(index) => {
                             this.deleteContentItem(index)
                         }}/>
        }

        let newArray = [...this.state.contentArray, entry];
        this.setState({contentArray: newArray}, () => {
            console.log(this.state.contentArray)
        })
    }

    deleteContentItem(index) {
        console.log(index);
        if (index === 0 && this.state.contentArray) {
            let newArray = [...this.state.contentArray];
            newArray.shift();
            this.setState({contentArray: newArray}, () => {
                console.log(this.state)
            });
        } else {
            let newArray = [...this.state.contentArray];
            newArray.splice(index, 1);
            this.setState({contentArray: newArray}, () => {
                console.log(this.state)
            })
        }
    }

    render() {
        return (
            <Card>
                <Card.Header>
                    <Row className="align-items-center justify-content-start">
                        <Col md={"auto"}>
                            Agregar {this.props.content.header}
                        </Col>
                        <Col md={"auto"}>
                            <Button variant="success" onClick={(event) => {
                                this.addContentItem()
                            }}>+</Button>
                        </Col>
                    </Row>
                </Card.Header>
                <Card.Body>{this.state.contentArray}</Card.Body>
            </Card>
        )
    }
}

export default DynamicComponent