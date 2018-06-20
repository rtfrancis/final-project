import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxPromise from "redux-promise";
import { composeWithDevTools } from "redux-devtools-extension";
import reducer from "./reducers";
import Welcome from "./welcome";
import App from "./app";
// import Login from "./login";

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(reduxPromise))
);

let component;
if (location.pathname == "/welcome") {
    component = <Welcome />;
    console.log("logged OUT");
} else {
    component = (
        <Provider store={store}>
            <App />
        </Provider>
    );

    console.log("LOGGED IN");
}

ReactDOM.render(component, document.querySelector("main"));

// function HelloWorld() {
//     return <div>Hello, World!</div>;
// }
