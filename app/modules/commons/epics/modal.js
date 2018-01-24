export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';

export const openModal = (props) => ({ type: OPEN_MODAL, payload: props });

export const closeModal = () => ({ type: CLOSE_MODAL });