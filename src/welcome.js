import React from "react";
// import { connect } from "react-redux";
import { BrowserRouter, Link, Route } from "react-router-dom";
import Login from "./login";
import Registration from "./registration";
import About from "./about";

export default function Welcome() {
    return (
        <BrowserRouter>
            <div id="welcome">
                <h1 className="welcomeHeading">Kultur Konnect</h1>
                <Link to="/login">
                    <button id="loginButton">Log in</button>
                </Link>
                <About />
                <div>
                    <Route exact path="/welcome" component={Registration} />
                    <Route path="/login" component={Login} />
                </div>
            </div>
        </BrowserRouter>
    );
}
