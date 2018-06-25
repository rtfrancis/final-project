import React from "react";
import { connect } from "react-redux";
import UserUploadedEvents from "./userevents";

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
                <h1>Inside the profile page</h1>
                {this.props.loggedIn.first}
                <UserUploadedEvents />
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
