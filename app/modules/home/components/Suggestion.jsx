import React, { Component } from "react";
import {injectIntl} from "react-intl";
import Autosuggest from "react-autosuggest";
import {
  getSuggestions,
  getSuggestionValue,
  renderSuggestion,
  renderSuggestionsContainer
} from "../utils/suggestionHelpers";

class Suggestion extends Component {
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
    const { search, loading, suggestions, onSelection, onChange, intl } = this.props;
    const placeholder = intl.formatMessage({id: "home.search"});

    const inputProps = {
      value: search,
      loading,
      placeholder,
      "aria-label": placeholder,
      onChange: (ev, { newValue }) => onChange(newValue)
    };

    return (
      <Autosuggest
        focusInputOnSuggestionClick={false}
        onSuggestionSelected={(event, { suggestion }) =>
          onSelection(suggestion)
        }
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested.bind(
          this
        )}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested.bind(
          this
        )}
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

export default injectIntl(Suggestion);