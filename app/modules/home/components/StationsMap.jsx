import React, { Component } from "react";
import moment from "moment";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import { icon, latLng } from "leaflet";
import MarkerCluster from "react-leaflet-markercluster";

import station from "assets/map/map-marker.svg";
import user from "assets/map/map-marker-with-a-person-shape.svg";
import { googleDirections, openStreetMapsLayer } from "../../commons/utils/APIs";

const stationIcon = icon({
  iconUrl: station,
  iconSize: [32, 48],
  iconAnchor: [16, 48],
  popupAnchor: [0, -40]
});

const userIcon = icon({
  iconUrl: user,
  iconSize: [32, 48],
  iconAnchor: [16, 48],
  popupAnchor: [0, -40]
});

const cap = string => string.charAt(0).toUpperCase() + string.slice(1);

export default class StationsMap extends Component {

  _buildPopup(station) {
    const copy = { ...station, lastCheck: cap(moment(station.timeStamp).fromNow()) };

    const entries = [
      { key: 'name', label: 'Station' },
      { key: 'status', label: 'Status' },
      { key: 'free_bikes', label: 'Free bikes' },
      { key: 'lastCheck', label: 'Last check' }
    ];

    return (
      <div>
        {entries.map(({ key, label }, idx) =>
          copy.hasOwnProperty(key) ?
            <span key={idx} className='station-property'><b
              className='popup-label'>{label}:</b>{copy[key]}</span> : null
        ).filter(line => !!line)}

        <span className='stations-property'>
          <a href={googleDirections(`?api=1&travelmode=walking&destination=${station.latitude},${station.longitude}`)}> Get directions <i
            className='fa fa-external-link is-small'/> </a>
        </span>
      </div>
    )
  }

  render() {
    const { network: { location, stations }, currentLocation } = this.props;
    const { latitude, longitude } = currentLocation || location;

    const latLngs = stations ? stations.map(({ latitude, longitude }) => latLng(latitude, longitude)) : null;
    const userLatLng = latLng(latitude, longitude);

    return (
      <Map center={userLatLng} bounds={latLngs} zoom={13}>
        <TileLayer
          attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          url={openStreetMapsLayer}
        />
        <Marker position={userLatLng} icon={userIcon}/>

        {stations ?
          <MarkerCluster>
            {stations.map((station, idx) =>
              <Marker key={idx} position={latLng(station.latitude, station.longitude)} icon={stationIcon}>
                <Popup>
                  {this._buildPopup(station)}
                </Popup>
              </Marker>
            )}
          </MarkerCluster>
          : null}

      </Map>
    )
  }
}