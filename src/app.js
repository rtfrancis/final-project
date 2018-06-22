import React from "react";
import { connect } from "react-redux";
import { BrowserRouter, Link, Route } from "react-router-dom";
import Nav from "./nav";
import Events from "./events";
import Profile from "./profile";
import Search from "./search";
import AddEvent from "./addevent";
import EventDisplay from "./eventDisplay";

class App extends React.Component {
    constructor(props) {
        super(props);
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
                </div>
            </BrowserRouter>
        );
    }
}

export default connect(null)(App);
// export default connect(getStateFromRedux)(App);
