import { CITY_SELECTED, SEARCH_CHANGE, STATIONS_LOADED, SUGGESTIONS_CHANGE } from "../epics/index";
import { AUTO_SEARCH_LOCK } from "../../commons/epics/index";

export default function homeReducer(state = {
  selectedProvider: null,
  network: null,
  search: '',
  searchLock: false,
  suggestions: []
}, { type, payload }) {
  switch (type) {
    case AUTO_SEARCH_LOCK:
      return { ...state, searchLock: payload };

    case CITY_SELECTED:
      return { ...state, selectedProvider: payload };

    case STATIONS_LOADED:
      return { ...state, network: payload };

    case SEARCH_CHANGE:
      return { ...state, search: payload };

    case SUGGESTIONS_CHANGE:
      return { ...state, suggestions: payload };
  }

  return state;
}