import React from "react";
import { connect } from "react-redux";

class Profile extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <h1>Inside the profile page</h1>
            </div>
        );
    }
}

export default connect(null)(Profile);
