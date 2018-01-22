import React, { Component } from 'react';
import Suggestion from "./Suggestion";

export default class Home extends Component {
  render() {
    const {
      networks = [], search, searchLock, suggestions, location, place, citySelected, searchChange, suggestionsChange
    } = this.props;

    const cities = networks.map(({ id, location: { city, country } }) => ({ id, name: city, country }));

    return (
      <div className='home'>
        <div className="search-box">
          <h1 className="title">Find a Bike</h1>
          <div className='field'>
            <Suggestion search={search} suggestions={suggestions} onChange={searchChange}
                        onSuggestionsChange={suggestionsChange}
                        onSelection={(selection) => citySelected(selection)}
                        cities={cities} loading={searchLock}/>
          </div>
        </div>
        <div className='decoration-box box'>
          <div className="decoration"/>
        </div>
      </div>
    );
  }
}
