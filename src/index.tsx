import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import App from "./App";

import { store } from "./store";

import "typeface-roboto";
import "typeface-roboto-mono";
import "typeface-montserrat";

import "./styles.scss";

ReactDOM.render(
    <StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </StrictMode>,
    document.getElementById("root"),
);
