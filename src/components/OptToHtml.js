import React from 'react';
import UITemplate from "./UITemplate";
import {Button, Col, Container, Row, Spinner} from "react-bootstrap";
import {Field, Form, Formik} from "formik";
import CustomFile from "../inputs/CustomFile";
import request from "request";

const fetchJsonTemplate = (opt, callback) => {
    let options = {
        url: 'https://opt-meta-ui-dev.doc.com/opt/meta',
        method: 'POST',
        headers: {
            'Content-Type': 'application/xml'
        },
        body: opt
    };
    request(options, callback);
};

const handleFile = (file, callback) => {
    try {
        let fileReader = new FileReader();
        fileReader.onloadend = (e) => {
            const content = fileReader.result;
            callback(null, content)
        };
        fileReader.readAsText(file);
    } catch (e) {
        callback(e)
    }
};

const OptToHtml = (props) => {
    return (
        <Container className="mt-3">
            <Formik
                onSubmit={(values, actions) => {
                    if (values.optFile) {
                        handleFile(values.optFile, (err, content) => {
                            if (!err) {
                                props.setState({fetchingJsonTemplate: true});
                                fetchJsonTemplate(content, (error, response, body) => {
                                    if (err) {
                                        console.error(error);
                                    } else {
                                        props.setState({
                                            fetchingJsonTemplate: false,
                                            jsonTemplate: JSON.parse(response.body)
                                        });
                                    }
                                });
                            } else {
                                console.error(err);
                            }
                        });
                    } else {
                        console.error("File is null");
                    }
                }}
                render={({errors, status, touched, isSubmitting}) => (
                    <Form>
                        <Row>
                            <Col>
                                <Field
                                    name="optFile"
                                    component={CustomFile}
                                />
                            </Col>
                            <Col className={"col-md-3"}>
                                <div className="d-flex justify-content-end">
                                    <Button type={"submit"} variant="success">Generar Formulario</Button>
                                </div>
                            </Col>
                        </Row>
                    </Form>
                )}/>
            {props.fetchingJsonTemplate ?
                <Row className={"mt-3 justify-content-center"}>
                    <Spinner animation="border" role="status">
                        <span className="sr-only">Procesando OPT...</span>
                    </Spinner>
                </Row>
                : ''}
            {props.template ? <UITemplate template={props.template} translate={() => {
            }}/> : ''}
        </Container>
    )
};

export default OptToHtml