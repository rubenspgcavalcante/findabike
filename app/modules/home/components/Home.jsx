import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import Suggestion from "./Suggestion";

import mosaicPng from "assets/mosaic.png";
import mosaicWebp from "assets/mosaic.webp";
import AsyncComponent from "modules/commons/components/AsyncComponent";

export default class Home extends Component {
  render() {
    const {
      networks = [],
      network,
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
                <FormattedMessage id="home.credits" />{" "}
                <i className="fa fa-info-circle" />
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
            <div className="decoration">
              <picture>
                <source srcSet={mosaicWebp} type="image/webp" />
                <img src={mosaicPng} alt="mosaic" />
              </picture>
            </div>
          </div>
        </div>
        {network ? (
          <AsyncComponent
            importer={() =>
              import(/* webpackMode: "lazy" */
              /* webpackChunkName: "StationsMap" */
              "../containers/StationsMap")
            }
          />
        ) : null}
      </div>
    );
  }
}
