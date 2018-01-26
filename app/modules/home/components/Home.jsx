import React, { Component } from 'react';
import Suggestion from "./Suggestion";
import StationsMap from "../containers/StationsMap";

export default class Home extends Component {
  render() {
    const {
      networks = [], search, searchLock, suggestions, citySelected, searchChange, suggestionsChange
    } = this.props;

    const places = networks.map(({ id, company, location }) => ({
      id,
      name,
      city: location ? location.city : null,
      country: location ? location.country : null,
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
        <StationsMap/>
      </div>
    );
  }
}
