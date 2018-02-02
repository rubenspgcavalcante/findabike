import { CLOSE_MODAL, OPEN_MODAL } from "../epics/modal";

export default function modal(
  state = { active: false, title: null, type: null, content: null },
  { type, payload }
) {
  switch (type) {
    case OPEN_MODAL:
      return { ...state, active: true, ...payload };

    case CLOSE_MODAL:
      return {
        ...state,
        active: false,
        title: null,
        type: null,
        content: null
      };
  }

  return state;
}
