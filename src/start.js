import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxPromise from "redux-promise";
import { composeWithDevTools } from "redux-devtools-extension";
import reducer from "./reducers";
import Welcome from "./welcome";
import App from "./app";

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
