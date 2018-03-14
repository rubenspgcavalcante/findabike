import React, { Component } from "react";
import { injectIntl } from "react-intl";
import classNames from "classnames";
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
    const { showLocationReqBtn, onLocationRequest } = this.props;

    const fieldClass = classNames("field", {
      "has-addons": showLocationReqBtn
    });
    const controlClass = classNames("control", "is-expanded", {
      "is-loading": loading
    });
    const inputClass = classNames("input", "is-rounded", { disabled: loading });

    return (
      <div className={fieldClass}>
        <p className={controlClass}>
          <input
            className={inputClass}
            aria-disabled={loading}
            type="text"
            {...inputProps}
            disabled={loading}
          />
        </p>
        {showLocationReqBtn ? (
          <p className="control">
            <button
              name="find-my-location"
              disabled={loading}
              className="button is-rounded"
              onClick={() => onLocationRequest()}
            >
              <i className="fa fa-map-marker" />
            </button>
          </p>
        ) : null}
      </div>
    );
  }

  render() {
    const {
      search,
      loading,
      suggestions,
      onSelection,
      onChange,
      intl
    } = this.props;
    const placeholder = intl.formatMessage({ id: "home.search" });

    const inputProps = {
      value: search || "",
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
        theme={{ suggestionHighlighted: "is-active" }}
      />
    );
  }
}

export default injectIntl(Suggestion);
