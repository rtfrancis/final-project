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
import ImagesUploader from "./imageuploader";
import ProfileImageUploader from "./profileimage.js";
import EditEventDates from "./editdates.js";
import Carousel from "./carousel";

class App extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.props.dispatch(loggedInUser());
        console.log("2018-06-28" < "2018-06-29");
    }
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Nav />

                    <Route exact path="/" component={Carousel} />
                    <Route path="/events" component={Events} />
                    <Route path="/profile" component={Profile} />
                    <Route path="/search" component={Search} />
                    <Route path="/addevent" component={AddEvent} />
                    <Route path="/event/:id" component={EventDisplay} />
                    <Route path="/editevent/:id" component={EditEvent} />
                    <Route path="/uploadimage/:id" component={ImagesUploader} />
                    <Route
                        path="/uploadprofileimage"
                        component={ProfileImageUploader}
                    />
                    <Route path="/editdates/:id" component={EditEventDates} />
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
