import React, { Component } from 'react';

export default class Home extends Component {

  componentWillMount() {

  }

  render() {
    return (
      <div className='home box'>
        <div>
          <h1 className="title">Find a Bike</h1>
          <div className='field'>
            <div className="control has-icons-left">
              <input className="input" placeholder="Choose your city"/>
              <span className="icon is-small is-left"><i className="fa fa-search"/></span>
            </div>
          </div>
        </div>
        <div className="decoration"/>
      </div>
    );
  }
}
