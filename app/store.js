import { applyMiddleware, createStore } from "redux";
import { combineEpics, createEpicMiddleware } from "redux-observable";
import { composeWithDevTools } from "redux-devtools-extension";

import reducer from "./reducer";
import { autoSelectCityEpic, citySelectedEpic } from "./modules/home/epics";
import {
  loadLocationEpic,
  loadNetworksEpic,
  loadPlaceEpic,
  setPersistentStorageEpic,
  updateLocationEpic,
  offlineWatcherEpic
} from "./modules/commons/epics";

const rootEpic = combineEpics(
  setPersistentStorageEpic,
  loadNetworksEpic,
  loadLocationEpic,
  updateLocationEpic,
  loadPlaceEpic,
  citySelectedEpic,
  autoSelectCityEpic,
  offlineWatcherEpic
);

export default createStore(
  reducer,
  composeWithDevTools(applyMiddleware(createEpicMiddleware(rootEpic)))
);
