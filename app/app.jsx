import React from 'react';
import { render } from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from 'react-router-dom';
import runtime from 'serviceworker-webpack-plugin/lib/runtime';

import store from "./store";
import "./app.scss";
import Home from "./modules/home/containers/Home";
import { appBootstrap } from "./modules/commons/epics";

if ('serviceWorker' in navigator) {
  runtime.register();
}

store.dispatch(appBootstrap());

const App = () =>
  <Router>
    <div id="react-app" className="container is-fluid">
      <div className="section">
        <Home/>
      </div>
      <footer className="section">
        <div className="box is-small">
          <span>Powered by:</span>
          <div className='credits-box'>
            <a href="https://www.openstreetmap.org" target='_blank'>Open Street Map</a>&
            <a href="https://api.citybik.es/v2/" target='_blank'>CityBikes</a>&
            <a href="https://surge.sh/" target='_blank'>Surge</a>
          </div>
        </div>
      </footer>
    </div>
  </Router>;

render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById("app")
);