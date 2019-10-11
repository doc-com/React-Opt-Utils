import React, {Component} from "react"
import ConstrainedTextContent from "./ConstrainedTextContent";
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
                searchTerminologies={(search) => {
                    this.setState({loading: true}, () => {
                        this.fetchTerminologies(search, this.props.control.referenceSetUri, (results) => {
                            this.setState({loading: false, queryResults: results})
                        })
                    });

                }}
                loading={this.state.loading}
                path={this.props.path}
                control={this.props.control}
                translate={this.props.translate}
                options={this.state.queryResults}
            />
        )
    }

    fetchTerminologies(search, referenceSetUri, callback) {
        let formattedExp = referenceSetUri.referenceSet.replace(':', '=');
        let options = {
            url: `${process.env.REACT_APP_TERMINOLOGY_HOST}${formattedExp}`,
            method: 'GET',
            headers: {
                'Accept-Language': 'en',
                'Accept': 'application/json'
            }
        };
        request(options, callback);
    }
}

export default ConstrainedText