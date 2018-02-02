import React from "react";
import ReactDOM from "react-dom";
import { control, DomUtil } from "leaflet";
import { MapControl } from "react-leaflet";
import { object } from "prop-types";

export default class CustomControl extends MapControl {
  componentWillMount() {
    const { title, icon, position } = this.props;
    const customControl = control({ position });
    const div = DomUtil.create("div", "");

    customControl.onAdd = map => {
      ReactDOM.render(
        <a className="box map-control" href="#" title={title} role="button">
          {" "}
          <i
            className={`fa fa-${icon}`}
            onClick={() => this.props.onClick(map)}
          />
        </a>,
        div
      );

      return div;
    };

    this.leafletElement = customControl;
  }
}
