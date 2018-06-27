import React from "react";
import { connect } from "react-redux";

class Search extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <h1>Inside the search page</h1>
                <div>City Search:</div>
                <div>City and category</div>
                <div>City and date</div>
                <div>Artist or Instituion</div>
            </div>
        );
    }
}

export default connect(null)(Search);
