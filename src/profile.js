import React from "react";
import { connect } from "react-redux";
import UserUploadedEvents from "./userevents";
import { Link } from "react-router-dom";
import InterestedEvents from "./interestedevents";

class Profile extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {}
    render() {
        if (!this.props.loggedIn) {
            return null;
        }
        return (
            <div>
                <div className="userProfileDiv">
                    <h1>Inside the profile page</h1>
                    <div className="profilePicDiv">
                        <img src={this.props.loggedIn.photo} />
                        <Link to="/uploadprofileimage">
                            <p>Upload a profile pic</p>
                        </Link>
                    </div>
                    {this.props.loggedIn.first}
                </div>
                <div className="profileComponentsContainer">
                    <div id="myOwnEvents">
                        <UserUploadedEvents />
                    </div>
                    <div id="myInterestedEvents">
                        <InterestedEvents />
                    </div>
                </div>
            </div>
        );
    }
}

const getStateFromRedux = state => {
    console.log("STATE INSIDE PROFILE", state);
    return {
        loggedIn: state.loggedIn
    };
};

export default connect(getStateFromRedux)(Profile);
