import React from "react";
import { Link } from "react-router-dom";
import Search from "./search";

export default function nav() {
    return (
        <div id="navBar">
            <Link to="/">
                <span id="welcomeHeading">Kultur Konnect</span>
            </Link>
            <span id="navLinks">
                <Search />
                <Link to="/events">
                    <span className="nav">Events</span>
                </Link>

                <Link to="/profile">
                    <span className="nav">My Events</span>
                </Link>
                <Link to="/addevent">
                    <span className="nav addEventNav">+ Add an event</span>
                </Link>
                <a href="/logout">
                    <span className="nav logoutButton">Logout</span>
                </a>
            </span>
        </div>
    );
}
