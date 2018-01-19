import React, { Component } from 'react';
import Suggestion from "./Suggestion";

export default class Home extends Component {
  render() {
    const { networks = [], citySelected } = this.props;
    const cities = networks.map(({ id, location: { city, country } }) => ({ id, name: city, country }));

    return (
      <div className='home'>
        <div className="search-box">
          <h1 className="title">Find a Bike</h1>
          <div className='field'>
            <Suggestion onSelection={(selection) => citySelected(selection)} cities={cities}/>
          </div>
        </div>
        <div className='decoration-box box'>
          <div className="decoration"/>
        </div>
      </div>
    );
  }
}
