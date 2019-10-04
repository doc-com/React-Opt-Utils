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
        let dynamicId = uuid.v1();
        if (this.props.content.itemType === "section") {
            entry = {
                section: this.props.content,
                key: this.props.content.header + this.props.content.orderInParent + "" + dynamicId,
                dynamicId: dynamicId
            };
        }

        if (this.props.content.itemType === "control") {
            entry = {
                control: this.props.content,
                key: this.props.content.id + "" + dynamicId,
                dynamicId: dynamicId
            };
        }

        let newArray = [...this.state.contentArray, entry];
        this.setState({contentArray: newArray})
        /*
        let entry;
        let dynamicId = uuid.v1();
        if (this.props.content.itemType === "section") {
            entry = <Section section={this.props.content}
                             key={this.props.content.header + this.props.content.orderInParent + "" + dynamicId}
                             translate={this.props.translate} isDynamic={true}
                             dynamicId={dynamicId}
                             deleteContentItem={(index) => {
                                 this.deleteContentItem(index)
                             }}/>
        }

        if (this.props.content.itemType === "control") {
            entry =
                <Control control={this.props.content} key={this.props.content.id + "" + dynamicId}
                         translate={this.props.translate} isDynamic={true}
                         dynamicId={dynamicId}
                         deleteContentItem={(index) => {
                             this.deleteContentItem(index)
                         }}/>
        }

        let newArray = [...this.state.contentArray, entry];
        this.setState({contentArray: newArray})
         */
    }

    deleteContentItem(index) {
        let newArray = [...this.state.contentArray];
        if (index === 0) {
            newArray.shift()
        } else {
            newArray.splice(index, 1);
        }
        this.setState({contentArray: newArray}, () => {
            console.log(this.state)
        })
        /*
        console.log(dynamicId);
        let newArray = [...this.state.contentArray];
        let item = newArray.find((item) => {
            return item.dynamicId === dynamicId
        });
        newArray.splice(newArray.indexOf(item), 1);
        this.setState({contentArray: newArray}, () => {
            console.log(this.state)
        })*/

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
                                event.preventDefault()
                                this.addContentItem()
                            }}>+</Button>
                        </Col>
                    </Row>
                </Card.Header>
                <Card.Body>{this.state.contentArray.map((entry, index) => {
                    if (this.props.content.itemType === "section") {
                        return <Section path={`${this.props.path}[${index}]`}
                                        form={this.props.form}
                                        section={entry.section}
                                        key={entry.key}
                                        translate={this.props.translate} isDynamic={true}
                                        dynamicId={entry.dynamicId}
                                        dynamicIndex={index}
                                        deleteContentItem={(index) => {
                                            this.deleteContentItem(index)
                                        }}/>
                    }

                    if (this.props.content.itemType === "control") {
                        return <Control path={`${this.props.path}[${index}]`}
                                        form={this.props.form}
                                        control={entry.control}
                                        key={entry.key}
                                        translate={this.props.translate} isDynamic={true}
                                        dynamicId={entry.dynamicId}
                                        dynamicIndex={index}
                                        deleteContentItem={(index) => {
                                            this.deleteContentItem(index)
                                        }}/>
                    }

                    return ''
                })}</Card.Body>
            </Card>
        )
    }
}

export default DynamicComponent