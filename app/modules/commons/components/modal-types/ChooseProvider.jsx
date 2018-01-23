import React, { Component } from "react";

export default class ChooseProvider extends Component {

  render() {
    const { content } = this.props;

    return (
      <div className='control'>
        {content.map((network, idx) =>
          <label className="radio is-block is-marginless"
                 key={idx}><input type='radio' name='provider'
                                  checked={idx === 0}/> {network.company[0]}
          </label>
        )}
      </div>
    )
  }
}