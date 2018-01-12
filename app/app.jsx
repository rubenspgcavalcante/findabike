import React from 'react';
import { render } from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from 'react-router-dom';

import store from "./store";
import "./style/app.scss";


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