import React, { Component } from 'react';
import Suggestion from "./Suggestion";
import StationsMap from "./StationsMap";

export default class Home extends Component {
  render() {
    const {
      networks = [], network, search, searchLock, suggestions, location, place, citySelected, searchChange, suggestionsChange
    } = this.props;

    const places = networks.map(({ id, company, location: { city, country } }) => ({
      id,
      name,
      city,
      country,
      company: company && company[0]
    }));

    return (
      <div className='home'>
        <div>
          <div className="search-box">
            <h1 className="title">Find a Bike</h1>
            <div className='field'>
              <Suggestion search={search} suggestions={suggestions} onChange={searchChange}
                          onSuggestionsChange={suggestionsChange}
                          onSelection={(selection) => citySelected(selection)}
                          places={places} loading={searchLock}/>
            </div>
          </div>
          <div className='decoration-box box'>
            <div className="decoration"/>
          </div>
        </div>
        {network ? <div className="map-container box">
          <StationsMap currentLocation={location} network={network}/>
        </div> : null}
      </div>
    );
  }
}
