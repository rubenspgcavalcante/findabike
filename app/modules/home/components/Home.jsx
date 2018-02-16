import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import Suggestion from "./Suggestion";
import StationsMap from "../containers/StationsMap";

export default class Home extends Component {
  render() {
    const {
      networks = [],
      search,
      searchLock,
      currentLatLng,
      suggestions,
      citySelected,
      searchChange,
      locationRequest,
      suggestionsChange,
      showCredits
    } = this.props;

    const places = networks.map(({ id, name, location }) => ({
      id,
      project: name,
      city: location ? location.city : null,
      country: location ? location.country : null
    }));

    return (
      <div className="home">
        <div>
          <div className="search-container">
            <div className="wrapper">
              <h1 className="title">Find a Bike</h1>
              <a
                href="#"
                role="button"
                className="show-credits"
                onClick={showCredits}
              >
                <FormattedMessage id="home.credits"/>{" "}
                <i className="fa fa-info-circle"/>
              </a>
              <Suggestion
                search={search}
                suggestions={suggestions}
                showLocationReqBtn={!currentLatLng}
                onLocationRequest={locationRequest}
                onChange={searchChange}
                onSuggestionsChange={suggestionsChange}
                onSelection={selection => citySelected(selection)}
                places={places}
                loading={searchLock}
              />
            </div>
          </div>
          <div className="decoration-box box">
            <div className="decoration"/>
          </div>
        </div>
        <StationsMap/>
      </div>
    );
  }
}
