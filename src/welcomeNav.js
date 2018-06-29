import React from "react";
import { Link } from "react-router-dom";

export default function welcomeNav() {
    return (
        <div id="navBar">
            <Link to="/welcome">
                <span id="welcomeHeading">Kultur Konnect</span>
            </Link>
            <span id="navLinks">
                <Link to="/guest">
                    <span className="nav addEventNav">View as guest</span>
                </Link>
                <Link to="/login">
                    <span className="nav logoutButton">Log In</span>
                </Link>
            </span>
        </div>
    );
}
