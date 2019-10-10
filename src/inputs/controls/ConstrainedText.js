import React, {Component} from "react"
import ConstrainedTextContent from "./ConstrainedTextContent";
import endpoints from "../../constants/endpoints";
import request from "request";

class ConstrainedText extends Component {

    constructor(props) {
        super(props);
        this.state = {
            query: '',
            queryResults: [],
            loading: false
        }
    }

    render() {
        return (
            <ConstrainedTextContent
                setState={(newState) => {
                    this.setState(newState)
                }}
                path={this.props.path}
                control={this.props.control}
                translate={this.props.translate}
                options={this.state.queryResults}

            />
        )
    }

    fetchTerminologies() {
        let options = {
            url: `${process.env.REACT_APP_TERMINOLOGY_HOST}${endpoints.optMeta}`,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        };
        request(options, callback);
    }
}

export default ConstrainedText