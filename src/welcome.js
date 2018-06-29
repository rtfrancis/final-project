import React from "react";
// import { connect } from "react-redux";
import { BrowserRouter, Link, Route } from "react-router-dom";
import Login from "./login";
import Registration from "./registration";
import About from "./about";
import guestEvents from "./guestEvents";
import GuestEventDisplay from "./guestEventDisplay";
import WelcomeNav from "./welcomeNav";

export default function Welcome() {
    return (
        <BrowserRouter>
            <div className="welcomeNavBar">
                <WelcomeNav />

                <Route exact path="/welcome" component={Registration} />
                <Route path="/login" component={Login} />
                <Route path="/guest" component={guestEvents} />
                <Route path="/event/:id" component={GuestEventDisplay} />
            </div>
        </BrowserRouter>
    );
}
