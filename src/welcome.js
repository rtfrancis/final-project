import React from "react";
// import { connect } from "react-redux";
import { BrowserRouter, Link, Route } from "react-router-dom";
import Login from "./login";

export default function Welcome() {
    return (
        <div id="welcome">
            <h1 className="welcomeHeading">iMe</h1>
            <BrowserRouter>
                <div>
                    <Route path="/login" component={Login} />
                </div>
            </BrowserRouter>
        </div>
    );
}
