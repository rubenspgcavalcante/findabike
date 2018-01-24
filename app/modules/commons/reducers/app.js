import { LOCATION_LOADED, NETWORKS_LOADED, PLACE_LOADED } from "../epics/index";
import modal from "./modal";
import { CLOSE_MODAL, OPEN_MODAL } from "../epics/modal";
import { LOADING } from "../epics";

export default function appReducer(state = {
  location: null,
  place: null,
  loading: false,
  networks: [],
  modal: {},
}, { type, payload }) {
  switch (type) {
    case LOADING:
      return {...state, loading: payload};

    case NETWORKS_LOADED:
      return { ...state, networks: payload };

    case LOCATION_LOADED:
      return { ...state, location: payload };

    case PLACE_LOADED:
      return { ...state, place: payload };

    case OPEN_MODAL:
    case CLOSE_MODAL:
      return { ...state, modal: modal(state.modal, { type, payload }) };
  }

  return state;
}