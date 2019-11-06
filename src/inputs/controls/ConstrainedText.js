import React, {Component} from "react"
import ConstrainedTextContent from "./ConstrainedTextContent";
import request from "request";
import InternalCodedText from "./InternalCodedText";

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
                setInitialValues={this.props.setInitialValues}
                searchTerminologies={(search) => {
                    this.setState({loading: true}, () => {
                        console.log(this.props.control)
                        this.fetchTerminologies(search, this.props.control.referenceSetUri, (err, results) => {
                            console.log(results)
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
        let formattedExp = decodeURI(referenceSetUri.referenceSet).replace(':', '=');
        formattedExp = formattedExp.replace('%3A', '=').replace(/\s/g, "");
        let url = `${process.env.REACT_APP_TERMINOLOGY_HOST}${formattedExp}&term=${search}`;
        let options = {
            url: url,
            method: 'GET',
            headers: {
                'Accept-Language': 'en',
                'Accept': 'application/json'
            }
        };
        request(options, (err, response, body) => {
            callback(err, JSON.parse(body).items.map((entry) => {
                return {id: entry.conceptId, label: entry.pt.term}
            }))
        });
    }
}

export default ConstrainedText