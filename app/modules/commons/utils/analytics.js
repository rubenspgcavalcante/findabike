export const actionTrackerCreator = (eventCategory = "redux") => (
  eventAction,
  eventLabel
) =>
  process.env.NODE_ENV === "production"
    ? ga("send", "event", { eventCategory, eventAction, eventLabel })
    : null;
