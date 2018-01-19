import { APP_BOOTSTRAP_FINISHED } from "../epics/index";

export default function appReducer(state = {
  networks: []
}, { type, payload }) {
  switch (type) {
    case APP_BOOTSTRAP_FINISHED:
      return { ...state, networks: payload }
  }

  return state;
}