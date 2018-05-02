import React from "react";
import { toast } from "react-toastify";
import { FormattedMessage } from "react-intl";

export const cantShowPositionToast = toastFactory(
  "error.position.denied",
  toast.POSITION.BOTTOM_RIGHT
);

export default function toastFactory(messageId, position) {
  let id = null;

  return () => {
    const { isActive, error } = toast;

    if (!isActive(id)) {
      id = error(<FormattedMessage id={messageId} />, { position });
    }
  };
}
