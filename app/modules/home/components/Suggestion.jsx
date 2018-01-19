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

const renderInput = inputProps => (
  <div>
    <input className="input" placeholder="Choose your city" {...inputProps} />
    <span className="icon is-small is-left"><i className="fa fa-search"/></span>
  </div>
);

export default class Suggestion extends Component {
  constructor() {
    super();
    this.state = {
      value: '',
      suggestions: []
    };
  }

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };

  onSuggestionsFetchRequested = ({ value }) => {
    const { cities } = this.props;
    this.setState({
      suggestions: getSuggestions(cities, value)
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  render() {
    const { onSelection } = this.props;
    const { value, suggestions } = this.state;

    const inputProps = {
      value,
      onChange: this.onChange
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