import React from 'react';
import UITemplate from "./UITemplate";
import {getJsonTemplate} from "../util/getJsonTemplate";
import {Button, Col, Container, FormControl, InputGroup, Row} from "react-bootstrap";
import {Field, Form, Formik} from "formik";
import CustomFile from "../inputs/CustomFile";
import request from "request";

const fetchJsonTemplate = (opt, callback) => {
    let options = {
        url: 'http://opt-meta-ui-dev-alb-1758865666.us-east-1.elb.amazonaws.com/opt/meta',
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
    let uiOpt = '';
    return (
        <Container className="mt-3">
            <Formik
                onSubmit={(values, actions) => {
                    if (values.optFile) {
                        handleFile(values.optFile, (err, content) => {
                            if (!err) {
                                fetchJsonTemplate(content, (error, response, body) => {
                                    console.log(response)
                                });
                                //uiOpt = <UITemplate template={content} translate={() => {
                                //}}/>
                            } else {
                                console.error(err);
                            }
                        });
                    } else {
                        uiOpt = ''
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
                                    <Button type={"submit"} variant="success" onClick={(event) => {

                                    }}>Generar Formulario</Button>
                                </div>
                            </Col>
                        </Row>
                    </Form>
                )}/>
            {uiOpt}
        </Container>
    )
};

export default OptToHtml