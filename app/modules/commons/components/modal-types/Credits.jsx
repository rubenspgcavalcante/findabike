import React, { Component } from "react";
import { connect } from "react-redux";
import { closeModal } from "../../epics/modal";

const mapDispatchToProps = (dispatch) => ({
  closeModal: () => dispatch(closeModal()),
});

class Credits extends Component {
  render() {
    const { title } = this.props;

    return (
      <div>
        <header className="modal-card-head">
          <h1 className="modal-card-title">Powered by:</h1>
          <button className="delete" aria-label="close" onClick={this.props.closeModal}/>
        </header>
        <section className="modal-card-body">
          <ul>
            <li><a href="https://www.openstreetmap.org" target='_blank' rel="noopener">Open Street Map</a></li>
            <li><a href="https://api.citybik.es/v2/" target='_blank' rel="noopener">CityBikes</a></li>
            <li><a href="https://surge.sh/" target='_blank' rel="noopener">Surge</a></li>
          </ul>
        </section>
        <footer className="modal-card-foot"/>
      </div>
    )
  }
}

export default connect(null, mapDispatchToProps)(Credits);