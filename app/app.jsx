import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { IntlProvider } from "react-intl";

import runtime from "serviceworker-webpack-plugin/lib/runtime";

import store from "./store";
import "./app.scss";
import Home from "./modules/home/containers/Home";
import { appBootstrap } from "./modules/commons/epics";

import Modal from "./modules/commons/containers/Modal";
import LoadingBar from "./modules/commons/containers/LoadingBar";
import { language } from "./modules/commons/utils/locale";
import i18nInjector from "./modules/commons/utils/i18nInjector";

if ("serviceWorker" in navigator) {
  runtime.register();
}

document.addEventListener(
  "DOMContentLoaded",
  () => store.dispatch(appBootstrap()),
  false
);

const App = ({ i18n }) => (
  i18n ?
    <IntlProvider locale={language} messages={i18n}>
      <Router>
        <main id="react-app" className="container is-fluid">
          <LoadingBar/>
          <Modal/>
          <div className="section">
            <Home/>
          </div>
        </main>
      </Router>
    </IntlProvider> : null
);

i18nInjector().then(i18n =>
  render(
    <Provider store={store}>
      <App i18n={i18n}/>
    </Provider>,
    document.getElementById("app")
  )
);
