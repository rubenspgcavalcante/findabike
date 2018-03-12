export const actionTrackerCreator = (eventCategory = "redux") => (eventAction, eventLabel) =>
  ga("send", "event", { eventCategory, eventAction, eventLabel });