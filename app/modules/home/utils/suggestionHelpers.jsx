import React from "react";

export const getSuggestions = (places, value) => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0
    ? []
    : places
      .filter(
        place => place.city.toLowerCase().slice(0, inputLength) === inputValue
      )
      .slice(0, 4);
};

export const getSuggestionValue = suggestion => suggestion.name;

export const renderSuggestionsContainer = ({ containerProps, children }) => {
  return (
    <div className="suggestion-container" {...containerProps}>
      {children ? <div className="box"> {children}</div> : null}
    </div>
  );
};

export const renderSuggestion = ({ city, project, country }) => (
  <div className="suggestion">
    <div className="city">
      <span className="name">{city}</span>
      <span className="project">
        <small>{project}</small>
      </span>
    </div>
    {country ? <span className={`flag-icon flag-icon-${country.toLowerCase()}`}/> : null}
  </div>
);
