import React, {Component} from "react"
import _ from "lodash";
import UITemplate from "./UITemplate";

class UITemplateContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            initialValues: {}
        }
    }

    setInitialValues(path) {
        if (!_.get(this.state.initialValues, path)) {
            _.set(this.state.initialValues, path, '');
        }
    }

    render() {
        setInterval(function () {
        }.bind(this), 2000);
        return (
            <UITemplate
                setInitialValues={(path) => {
                    if (path) {
                        this.setInitialValues(path)
                    }
                }}
                initialValues={this.state.initialValues}
                template={this.props.template}
                translate={(value) => value}/>
        );
    }
}

export default UITemplateContainer