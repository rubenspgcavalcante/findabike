import { OPEN_MODAL } from "../epics/modal";

export default function modal(state = { active: false, title: null, type: null, content: null }, { type, payload }) {
  switch (type) {
    case OPEN_MODAL:
      return { ...state, active: true, ...payload };
  }

  return state;
}