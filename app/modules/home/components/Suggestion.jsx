import React, { Component } from "react";
import Autosuggest from "react-autosuggest";

const getSuggestions = (cities, value) => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0 ? [] : cities.filter(city =>
    city.name.toLowerCase().slice(0, inputLength) === inputValue
  ).slice(0, 4);
};

const getSuggestionValue = suggestion => suggestion.name;

const renderSuggestionsContainer = ({ containerProps, children }) => {
  return (
    <div className='suggestion-container' {...containerProps}>
      {children ? <div className='box'> {children}</div> : null}
    </div>
  );
};

const renderSuggestion = city => (
  <div className="suggestion">
    {city.name} - {city.country}
  </div>
);

const renderInput = ({ loading, ...inputProps }) => (
  loading ?
    <div>
      <input className="input is-disabled" type="text" {...inputProps} disabled={true}/>
      <span className="icon is-small is-left"><i className="fa fa-spinner fa-spin"/></span>
    </div> :
    <div>
      <input className="input" {...inputProps} />
      <span className="icon is-small is-left"><i className="fa fa-search"/></span>
    </div>
);

export default class Suggestion extends Component {
  onSuggestionsFetchRequested = ({ value }) => {
    const { cities, onSuggestionsChange } = this.props;
    onSuggestionsChange(getSuggestions(cities, value));
  };

  onSuggestionsClearRequested = () => {
    const { onSuggestionsChange } = this.props;
    onSuggestionsChange([]);
  };

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
        onSuggestionSelected={(event, { suggestion }) => onSelection(suggestion.id)}
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestionsContainer={renderSuggestionsContainer}
        renderSuggestion={renderSuggestion}
        renderInputComponent={renderInput}
        inputProps={inputProps}
        theme={{ container: "control has-icons-left" }}
      />
    )
  }
}