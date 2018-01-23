import { applyMiddleware, createStore } from "redux";
import { combineEpics, createEpicMiddleware } from "redux-observable";
import { composeWithDevTools } from "redux-devtools-extension";

import reducer from './reducer';
import { autoSelectCityEpic, citySelectedEpic } from "./modules/home/epics";
import { loadLocationEpic, loadNetworksEpic, loadPlaceEpic, setPersistentStorageEpic } from "./modules/commons/epics";

const rootEpic = combineEpics(setPersistentStorageEpic, loadNetworksEpic, loadLocationEpic, loadPlaceEpic, citySelectedEpic, autoSelectCityEpic);

export default createStore(
  reducer,
  composeWithDevTools(applyMiddleware(
    createEpicMiddleware(rootEpic)
  ))
);