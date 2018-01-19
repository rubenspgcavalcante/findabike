import { applyMiddleware, createStore } from "redux";
import { combineEpics, createEpicMiddleware } from "redux-observable";
import { composeWithDevTools } from "redux-devtools-extension";

import reducer from './reducer';
import { appBootstrapEpic } from "./modules/commons/epics/index";
import { citySelectedEpic } from "./modules/home/epics/index";

const rootEpic = combineEpics(appBootstrapEpic, citySelectedEpic);


export default createStore(
  reducer,
  composeWithDevTools(applyMiddleware(
    createEpicMiddleware(rootEpic)
  ))
);