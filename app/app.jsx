import React from 'react';
import { render } from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from 'react-router-dom';
import runtime from 'serviceworker-webpack-plugin/lib/runtime';

import store from "./store";
import "./style/app.scss";

if ('serviceWorker' in navigator) {
  const registration = runtime.register();
}

const App = () =>
  <Router>
    <div id="react-app">
      <div className="section">
        Hello world!
      </div>
    </div>
  </Router>;

render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById("app")
);