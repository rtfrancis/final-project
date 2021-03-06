import React from "react";
import { Link } from "react-router-dom";
import axios from "./axios";

export default class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleInput = this.handleInput.bind(this);
        this.registerUser = this.registerUser.bind(this);
    }
    handleInput(e) {
        this[e.target.name] = e.target.value;
    }
    registerUser() {
        const { first, last, city, email, password, passwordConfirm } = this;
        if (password == passwordConfirm) {
            axios
                .post("/register", {
                    first,
                    last,
                    city,
                    email,
                    password
                })
                .then(resp => {
                    console.log(resp);
                    if (resp.data.success) {
                        location.replace("/");
                    } else {
                        this.setState({
                            error: true
                        });
                    }
                });
        } else {
            console.log("You messed up!");
        }
    }

    render() {
        return (
            <div id="registrationPage">
                <p className="headline">See what's going on near you</p>
                <h2>Register here</h2>
                {this.state.error && (
                    <div className="err">
                        Something went wrong. Please try again.
                    </div>
                )}
                <input
                    autoComplete="off"
                    onChange={this.handleInput}
                    type="text"
                    name="first"
                    placeholder="first"
                />
                <input
                    autoComplete="off"
                    onChange={this.handleInput}
                    type="text"
                    name="last"
                    placeholder="last"
                />
                <input
                    autoComplete="off"
                    onChange={this.handleInput}
                    type="text"
                    name="city"
                    placeholder="city"
                />
                <input
                    autoComplete="off"
                    onChange={this.handleInput}
                    type="email"
                    name="email"
                    placeholder="email"
                />
                <input
                    autoComplete="off"
                    onChange={this.handleInput}
                    type="password"
                    name="password"
                    placeholder="password"
                />
                <input
                    autoComplete="off"
                    onChange={this.handleInput}
                    type="password"
                    name="passwordConfirm"
                    placeholder="confirm password"
                />
                <br />
                <br />
                <span id="registrationButton" onClick={this.registerUser}>
                    Register
                </span>
            </div>
        );
    }
}
