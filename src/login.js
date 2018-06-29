import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "./axios";

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleInput = this.handleInput.bind(this);
        this.loginUser = this.loginUser.bind(this);
    }
    handleInput(e) {
        this[e.target.name] = e.target.value;
    }
    loginUser() {
        const { email, password } = this;
        axios
            .post("/login", {
                email,
                password
            })
            .then(resp => {
                if (resp.data.success) {
                    location.replace("/");
                } else {
                    this.setState({
                        error: true
                    });
                }
            });
    }
    render() {
        return (
            <div className="loginDiv">
                <p className="headline">Welcome back</p>
                <h2>Log in</h2>

                <input
                    autoComplete="off"
                    onChange={this.handleInput}
                    name="email"
                    type="text"
                    placeholder="email"
                />
                <input
                    autoComplete="off"
                    onChange={this.handleInput}
                    name="password"
                    type="password"
                    placeholder="password"
                />
                <br />
                <br />
                <span id="submitButton" onClick={this.loginUser}>
                    Submit
                </span>
                <br />
                <br />
                <br />

                <Link to="/welcome">Back to registration</Link>
            </div>
        );
    }
}
