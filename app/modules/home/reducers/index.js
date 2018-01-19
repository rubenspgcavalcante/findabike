import { CITY_SELECTED, STATIONS_LOADED } from "../epics/index";

export default function homeReducer(state = {
  selectedProvider: null,
  network: null
}, action) {
  switch (action.type) {
    case CITY_SELECTED:
      return { ...state, selectedProvider: action.payload };

    case STATIONS_LOADED:
      return { ...state, network: action.payload };
  }

  return state;
}