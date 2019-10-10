import React from "react"
import {Button, Col, Form, InputGroup, OverlayTrigger, Tooltip} from "react-bootstrap";
import {FastField} from "formik";
import {validateMandatory} from "./util";

const validateConstrainedText = (value, occurrences, translate) => {
    let error;
    error = validateMandatory(value, occurrences, translate);
    return error;
};

const ConstrainedTextContent = (props) => {
    return (
        <FastField name={props.path}
                   validate={(value) => {
                       return validateConstrainedText(value, props.control.occurrences, props.translate)
                   }}
                   render={
                       ({field, form}) => {
                           //TODO Replace for translatable key in Medical Heroes
                           return (
                               <Form.Group as={Col} controlId={props.path}>
                                   <InputGroup>
                                       <Form.Control as="select"
                                                     {...field}
                                                     value={field.value ? JSON.stringify(field.value.code) : ''}
                                                     onChange={(e) => {
                                                         if (e.target.value) {
                                                             let selectedEntry = props.control.codeList.filter((entry) => {
                                                                 return entry.code === e.target.value
                                                             });
                                                             if (selectedEntry && selectedEntry[0]) {
                                                                 form.setFieldValue(props.path, {
                                                                     path: props.control.contributionPath,
                                                                     code: selectedEntry[0].code,
                                                                     textValue: selectedEntry[0].text
                                                                 })
                                                             }
                                                         } else {
                                                             form.handleChange(e)
                                                         }
                                                     }}
                                                     aria-describedby="inputGroupAppend"
                                                     isInvalid={!!_.get(form.errors, props.path) && _.get(form.touched, props.path)}>
                                           {[<option hidden disabled selected
                                                     value={""}>{props.translate('-- Select an option --')}</option>, ...props.control.codeList.map(
                                               (item, index) => <option key={`${props.path}-opt${index}`}
                                                                        value={item.code}>{item.text}</option>)]}
                                       </Form.Control>
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