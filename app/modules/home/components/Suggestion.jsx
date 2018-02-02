import React, { Component } from "react";
import Autosuggest from "react-autosuggest";

const getSuggestions = (places, value) => {
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

const getSuggestionValue = suggestion => suggestion.name;

const renderSuggestionsContainer = ({ containerProps, children }) => {
  return (
    <div className="suggestion-container" {...containerProps}>
      {children ? <div className="box"> {children}</div> : null}
    </div>
  );
};

const renderSuggestion = place => (
  <div className="suggestion">
    {place.city} - {place.country}
    <span className="company">({place.company})</span>
  </div>
);

export default class Suggestion extends Component {
  onSuggestionsFetchRequested({ value }) {
    const { places, onSuggestionsChange } = this.props;
    onSuggestionsChange(getSuggestions(places, value));
  }

  onSuggestionsClearRequested() {
    const { onSuggestionsChange } = this.props;
    onSuggestionsChange([]);
  }

  onSuggestionHighlighted({ suggestion }) {
    suggestion && this.props.onChange(suggestion.city);
  }

  _renderInput({ loading, ...inputProps }) {
    return loading ? (
      <div>
        <input
          className="input is-disabled"
          aria-disabled="true"
          type="text"
          {...inputProps}
          disabled={true}
        />
        <span className="icon is-small is-left">
          <i className="fa fa-spinner fa-spin" />
        </span>
      </div>
    ) : (
      <div>
        <input
          className="input"
          {...inputProps}
          aria-disabled="false"
          type="text"
        />
        <span className="icon is-small is-left">
          <i className="fa fa-search" />
        </span>
      </div>
    );
  }

  render() {
    const { search, loading, suggestions, onSelection, onChange } = this.props;

    const inputProps = {
      value: search,
      loading,
      placeholder: "Choose your city",
      onChange: (ev, { newValue }) => onChange(newValue)
    };

    return (
      <Autosuggest
        focusInputOnSuggestionClick={false}
        onSuggestionSelected={(event, { suggestion }) =>
          onSelection(suggestion)
        }
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        onSuggestionHighlighted={this.onSuggestionHighlighted.bind(this)}
        getSuggestionValue={getSuggestionValue}
        renderSuggestionsContainer={renderSuggestionsContainer}
        renderSuggestion={renderSuggestion}
        renderInputComponent={this._renderInput.bind(this)}
        inputProps={inputProps}
        theme={{
          container: "control has-icons-left",
          suggestionHighlighted: "is-active"
        }}
      />
    );
  }
}
