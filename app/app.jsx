import React from 'react';
import { render } from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from 'react-router-dom';
import runtime from 'serviceworker-webpack-plugin/lib/runtime';

import store from "./store";
import "./app.scss";
import Home from "./modules/home/containers/Home";
import { appBootstrap } from "./modules/commons/epics";

import Modal from "./modules/commons/containers/Modal";
import LoadingBar from "./modules/commons/containers/LoadingBar";

if ('serviceWorker' in navigator) {
  runtime.register();
}

document.addEventListener('DOMContentLoaded', () => store.dispatch(appBootstrap()), false);

const App = () =>
  <Router>
    <main id="react-app" className="container is-fluid">
      <LoadingBar/>
      <Modal/>
      <div className="section">
        <Home/>
      </div>
    </main>
  </Router>;

render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById("app")
);