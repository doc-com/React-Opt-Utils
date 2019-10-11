import React, {Component} from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Home from "./components/Home";
import OptToHtml from "./components/OptToHtml";
import {Nav, Navbar} from "react-bootstrap";
import MomentUtils from '@date-io/moment';
import {MuiPickersUtilsProvider} from '@material-ui/pickers';
import "bootstrap/dist/css/bootstrap.min.css";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            jsonTemplate: '',
            fetchingJsonTemplate: false
        }
    }

    render() {
        return (
            <MuiPickersUtilsProvider utils={MomentUtils}>
                <Router>
                    <div>
                        <Navbar bg="light" expand="lg">
                            <Navbar.Brand href="/">Doc.com OPT Utils</Navbar.Brand>
                            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="mr-auto">
                                    <Nav.Link href="/optToHtml">OPT a HTML</Nav.Link>
                                </Nav>
                            </Navbar.Collapse>
                        </Navbar>
                        <Switch>
                            <Route path="/optToHtml">
                                <OptToHtml template={this.state.jsonTemplate}
                                           fetchingJsonTemplate={this.state.fetchingJsonTemplate}
                                           setState={(newState) => {
                                               this.setState(newState)
                                           }}/>
                            </Route>
                            <Route path="/">
                                <Home/>
                            </Route>
                        </Switch>
                    </div>
                </Router>
            </MuiPickersUtilsProvider>
        );
    }

}

/*
function App() {
    return (
        <Router>
            <div>
                <Navbar bg="light" expand="lg">
                    <Navbar.Brand href="/">Doc.com OPT Utils</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="/optToHtml">OPT a HTML</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <Switch>
                    <Route path="/optToHtml">
                        <OptToHtml template={this.state.jsonTemplate} setJsonTemplate={(template) => {
                            this.setState({template: template})
                        }}/>
                    </Route>
                    <Route path="/">
                        <Home/>
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}*/

export default App;
