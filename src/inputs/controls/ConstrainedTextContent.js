import React from "react"
import {Button, Col, Form, InputGroup, OverlayTrigger, Tooltip} from "react-bootstrap";
import {AsyncTypeahead} from 'react-bootstrap-typeahead';
import {FastField} from "formik";
import {validateMandatory} from "./util";
import _ from "lodash";

const validateConstrainedText = (value, occurrences, translate) => {
    let error = "";
    //error = validateMandatory(value, occurrences, translate);
    return error;
};

const ConstrainedTextContent = (props) => {
    console.log(props.options);
    return (
        <FastField name={props.path}
                   validate={(value) => {
                       return validateConstrainedText(value, props.control.occurrences, props.translate)
                   }}
                   render={
                       ({field, form}) => {
                           if(props.path)props.setInitialValues(props.path);

                           //TODO Replace for translatable key in Medical Heroes
                           return (
                               <Form.Group as={Col} controlId={props.path}>
                                   <InputGroup>
                                       <AsyncTypeahead
                                           id={props.path}
                                           isLoading={props.loading}
                                           onSearch={(query) => {
                                               props.searchTerminologies(query)
                                           }}
                                           onChange={(selected) => {
                                               if (selected) {
                                                   form.setFieldValue(props.path, {
                                                       path: props.control.contributionPath,
                                                       code: selected.code,
                                                       textValue: selected.text,
                                                       type: props.control.type,
                                                       rmType: props.control.rmTypeName
                                                   })
                                               } else {
                                                   form.handleChange(selected)
                                               }
                                           }}
                                           options={props.options}
                                           isInvalid={_.get(form.errors, props.path) && _.get(form.touched, props.path)}
                                       />
                                       <InputGroup.Append>
                                           <OverlayTrigger
                                               placement={'bottom'}
                                               overlay={
                                                   <Tooltip id={`tooltip-bottom`}>{props.control.description}</Tooltip>
                                               }>
                                               <Button variant="secondary">?</Button>
                                           </OverlayTrigger>
                                       </InputGroup.Append>
                                       <Form.Control.Feedback type="invalid">
                                           {_.get(form.errors, props.path)}
                                       </Form.Control.Feedback>
                                   </InputGroup>
                               </Form.Group>
                           );
                       }
                   }/>
    )
};


export default ConstrainedTextContent