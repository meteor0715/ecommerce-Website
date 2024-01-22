import React from "react";
//import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
import "jquery";
import "popper.js/dist/umd/popper";
import "bootstrap/dist/js/bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";
import "./index.css";
import App from "./App";

//ReactDOM.render(<App />, document.getElementById("root"));
const root = createRoot(document.getElementById("root"));
root.render(<App />);
