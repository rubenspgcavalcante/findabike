import {
  CITY_SELECTED,
  SEARCH_CHANGE,
  STATIONS_LOADED,
  SUGGESTIONS_CHANGE
} from "../epics/index";
import { SEARCH_LOCK } from "../../commons/epics/index";
import { TOGGLE_MAP_FULLSCREEN } from "../epics";

export default function homeReducer(
  state = {
    selectedProvider: null,
    network: null,
    search: "",
    fullscreenMap: null,
    searchLock: false,
    suggestions: []
  },
  { type, payload }
) {
  switch (type) {
    case SEARCH_LOCK:
      return { ...state, searchLock: payload };

    case CITY_SELECTED:
      return { ...state, search: payload.city, selectedProvider: payload.id };

    case STATIONS_LOADED:
      return { ...state, network: payload };

    case SEARCH_CHANGE:
      return { ...state, search: payload };

    case SUGGESTIONS_CHANGE:
      return { ...state, suggestions: payload };

    case TOGGLE_MAP_FULLSCREEN:
      return { ...state, fullscreenMap: !state.fullscreenMap };
  }

  return state;
}
