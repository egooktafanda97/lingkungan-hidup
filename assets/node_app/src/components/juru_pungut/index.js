import React, { Component, useEffect } from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
// import Rute from "./Router/Router";
// import { config } from "./Constant/config";

// window.base_url = config.base_url;
import "./style.scss";
import Components from "./Components";
import { CheckLogin } from "../../utils/functionComponent";
const App = () => {
  useEffect(() => {
    CheckLogin();
  }, []);

  return <Components />;
};

render(<App />, document.getElementById("components"));
