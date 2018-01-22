import { PLACE_LOADED, LOCATION_LOADED, NETWORKS_LOADED } from "../epics/index";

export default function appReducer(state = {
  location: null,
  place: null,
  networks: []
}, { type, payload }) {
  switch (type) {
    case NETWORKS_LOADED:
      return { ...state, networks: payload };

    case LOCATION_LOADED:
      return { ...state, location: payload };

    case PLACE_LOADED:
      return { ...state, place: payload }
  }

  return state;
}