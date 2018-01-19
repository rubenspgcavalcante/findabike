import React from 'react';
import { render } from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from 'react-router-dom';
import runtime from 'serviceworker-webpack-plugin/lib/runtime';

import store from "./store";
import "./app.scss";
import Home from "./modules/home/components/Home";
import { appBootstrap } from "./modules/commons/epics/index";

if ('serviceWorker' in navigator) {
  const registration = runtime.register();
}

store.dispatch(appBootstrap());

const App = () =>
  <Router>
    <div id="react-app" className="container is-fluid">
      <div className="section">
        <Home/>
      </div>
    </div>
  </Router>;

render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById("app")
);