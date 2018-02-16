import React, { Component } from "react";
import moment from "moment";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import { icon, latLng } from "leaflet";
import MarkerCluster from "react-leaflet-markercluster";

import station from "assets/map/map-marker.png";
import user from "assets/map/map-marker-with-a-person-shape.png";
import {
  googleDirections,
  openStreetMapsLayer
} from "modules/commons/utils/APIs";
import CustomControl from "modules/commons/components/map/CustomControl";
import {
  exitFullscreen,
  launchFullscreen
} from "../../commons/utils/fullscreen";
import { THEME_COLOR } from "../../commons/utils/theme.constants";

const stationIcon = icon({
  iconUrl: station,
  iconSize: [24, 32],
  iconAnchor: [12, 32],
  popupAnchor: [0, -30]
});

const userIcon = icon({
  iconUrl: user,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -30]
});

const cap = string => string.charAt(0).toUpperCase() + string.slice(1);

export default class StationsMap extends Component {
  _buildPopup(station, intl) {
    const copy = {
      ...station,
      lastCheck: cap(moment(station.timeStamp).fromNow())
    };

    const entries = ["name", "status", "free_bikes", "lastCheck"].map(key => ({
      key,
      label: intl.formatMessage({ id: `map.station.${key}` })
    }));

    return (
      <div>
        {entries
          .map(
            ({ key, label }, idx) =>
              copy.hasOwnProperty(key) ? (
                <span key={idx} className="station-property">
                  <b className="popup-label">{label}:</b>
                  {copy[key]}
                </span>
              ) : null
          )
          .filter(line => !!line)}

        <span className="stations-property">
          <a
            rel="noopener"
            href={googleDirections(
              `?api=1&travelmode=walking&destination=${station.latitude},${
                station.longitude
              }`
            )}
          >
            {" "}
            {intl.formatMessage({ id: "map.station.getDirections" })}{" "}
            <i className="fa fa-external-link is-small" />
          </a>
        </span>
      </div>
    );
  }

  componentWillReceiveProps({ fullscreenMap }) {
    if (fullscreenMap !== null) {
      const lElem = this.map.leafletElement;
      const el = lElem.getContainer();
      fullscreenMap ? launchFullscreen(el) : exitFullscreen();
      lElem.invalidateSize();
    }
  }

  render() {
    const {
      network,
      location,
      mapCenter,
      fullscreenMap,
      toggleMapFullscreen,
      intl
    } = this.props;

    if (!network) {
      return null;
    }

    const { latitude, longitude } = location || network.location;
    const userLatLng = latLng(latitude, longitude);

    const bounds = network.stations
      ? network.stations.map(({ latitude, longitude }) =>
          latLng(latitude, longitude)
        )
      : null;

    const centerLatLng = mapCenter
      ? latLng(mapCenter.latitude, mapCenter.longitude)
      : null;

    return (
      <div className="map-container box">
        <Map
          ref={map => (this.map = map)}
          bounds={bounds}
          zoom={13}
          center={centerLatLng}
        >
          {location ? (
            <CustomControl
              position="bottomleft"
              title="Center on me"
              icon="user-circle"
              onClick={map => map.panTo(userLatLng)}
            />
          ) : null}
          <CustomControl
            position="bottomleft"
            title="Toggle fullscreen"
            icon={fullscreenMap ? "compress" : "expand"}
            onClick={() => toggleMapFullscreen()}
          />
          <TileLayer
            attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
            url={openStreetMapsLayer}
          />
          {location ? <Marker position={userLatLng} icon={userIcon} /> : null}

          {network.stations ? (
            <MarkerCluster options={{ polygonOptions: { color: THEME_COLOR } }}>
              {network.stations.map((station, idx) => (
                <Marker
                  key={idx}
                  position={latLng(station.latitude, station.longitude)}
                  icon={stationIcon}
                >
                  <Popup>{this._buildPopup(station, intl)}</Popup>
                </Marker>
              ))}
            </MarkerCluster>
          ) : null}
        </Map>
      </div>
    );
  }
}
