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
        const { first, last, email, password, passwordConfirm } = this;
        // console.log(first, last, email, password, passwordConfirm);
        if (password == passwordConfirm) {
            axios
                .post("/register", {
                    first,
                    last,
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
                <h2>Register here</h2>
                {this.state.error && (
                    <div className="err">
                        Something went wrong. Please try again.
                    </div>
                )}
                <input
                    onChange={this.handleInput}
                    type="text"
                    name="first"
                    placeholder="first"
                />
                <input
                    onChange={this.handleInput}
                    type="text"
                    name="last"
                    placeholder="last"
                />
                <input
                    onChange={this.handleInput}
                    type="email"
                    name="email"
                    placeholder="email"
                />
                <input
                    onChange={this.handleInput}
                    type="password"
                    name="password"
                    placeholder="password"
                />
                <input
                    onChange={this.handleInput}
                    type="password"
                    name="passwordConfirm"
                    placeholder="confirm password"
                />
                <button onClick={this.registerUser}>Register</button>
            </div>
        );
    }
}
