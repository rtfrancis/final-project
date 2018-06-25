import React from "react";
import { connect } from "react-redux";
import { BrowserRouter, Link, Route } from "react-router-dom";
import Nav from "./nav";
import Events from "./events";
import Profile from "./profile";
import Search from "./search";
import AddEvent from "./addevent";
import EventDisplay from "./eventDisplay";
import { loggedInUser } from "./actions";
import EditEvent from "./editEvent";

class App extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.props.dispatch(loggedInUser());
    }
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Nav />
                    <Route path="/events" component={Events} />
                    <Route path="/profile" component={Profile} />
                    <Route path="/search" component={Search} />
                    <Route path="/addevent" component={AddEvent} />
                    <Route path="/event/:id" component={EventDisplay} />
                    <Route path="/editevent/:id" component={EditEvent} />
                </div>
            </BrowserRouter>
        );
    }
}

const getStateFromRedux = state => {
    return {
        loggedIn: state.loggedIn
    };
};

export default connect(getStateFromRedux)(App);
// export default connect(getStateFromRedux)(App);
