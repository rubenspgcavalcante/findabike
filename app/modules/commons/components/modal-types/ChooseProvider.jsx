import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";

import { citySelected, searchChange } from "../../../home/epics";
import { closeModal } from "../../epics/modal";
import { searchLock } from "../../epics";

const mapDispatchToProps = dispatch => ({
  citySelected: city => dispatch(citySelected(city)),
  closeModal: () => dispatch(closeModal()),
  searchChange: search => dispatch(searchChange(search)),
  searchLock: lock => dispatch(searchLock(lock))
});

class ChooseProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chosenCity: null
    };
  }

  _select() {
    const { citySelected } = this.props;
    const { chosenCity: { id, location } } = this.state;

    citySelected({ id, city: location.city });
    this._close();
  }

  _close() {
    const { closeModal, searchLock } = this.props;
    closeModal();
    searchLock(false);
  }

  render() {
    const { title, content } = this.props;
    const { chosenCity } = this.state;

    return (
      <div id="choose-provider">
        <header className="modal-card-head">
          <h1 className="modal-card-title">
            <FormattedMessage id="provider.chooseFrom" /> {title}
          </h1>
          <button
            className="delete"
            aria-label="close"
            onClick={this._close.bind(this)}
          />
        </header>
        <section className="modal-card-body">
          <div className="control">
            {content.map((network, idx) => (
              <label className="radio is-block is-marginless" key={idx}>
                <input
                  type="radio"
                  name="provider"
                  value={network.id}
                  onClick={() => this.setState({ chosenCity: network })}
                />{" "}
                {network.company[0]}
              </label>
            ))}
          </div>
        </section>
        <footer className="modal-card-foot">
          <button
            disabled={!chosenCity}
            className="button is-success"
            onClick={this._select.bind(this)}
          >
            <FormattedMessage id="ui.select" />
          </button>
          <button className="button" onClick={this._close.bind(this)}>
            <FormattedMessage id="ui.cancel" capitalize />
          </button>
        </footer>
      </div>
    );
  }
}

export default connect(null, mapDispatchToProps)(ChooseProvider);
