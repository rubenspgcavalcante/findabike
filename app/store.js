import { applyMiddleware, createStore } from "redux";
import { combineEpics, createEpicMiddleware } from "redux-observable";
import { composeWithDevTools } from "redux-devtools-extension";

import reducer from './reducer';
import { loadLocationEpic, loadNetworksEpic, loadPlaceEpic } from "./modules/commons/epics/index";
import { autoSelectCityEpic, citySelectedEpic } from "./modules/home/epics/index";

const rootEpic = combineEpics(loadNetworksEpic, loadLocationEpic, loadPlaceEpic, citySelectedEpic, autoSelectCityEpic);


export default createStore(
  reducer,
  composeWithDevTools(applyMiddleware(
    createEpicMiddleware(rootEpic)
  ))
);