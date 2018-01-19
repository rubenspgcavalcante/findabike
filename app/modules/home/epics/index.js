import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/mergeMap";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/fromPromise";
import "rxjs/add/observable/dom/ajax";

import { cbAPI } from "../../commons/utils/citybikes";
import db from "../../commons/cache/db";

export const CITY_SELECTED = 'CITY_SELECTED';
export const STATIONS_LOADED = 'STATIONS_LOADED';

export const citySelected = (providerId) => ({ type: CITY_SELECTED, payload: providerId });
export const stationsLoaded = (network) => ({ type: STATIONS_LOADED, payload: network });

export const citySelectedEpic = action$ =>
  action$
    .ofType(CITY_SELECTED)
    .mergeMap(action =>
      Observable.ajax({
        url: cbAPI(`networks/${action.payload}`),
        method: 'GET',
        responseType: 'json',
        crossDomain: true
      }).map(({ response, status }) => {
          if (status <= 400) {
            db.networks.update({id: action.payload}, response.network);
            return stationsLoaded(response);
          }
        }
      ).catch((err) =>
        Observable.fromPromise(
          db.networks.where("id").equals(action.payload).first().then(network => {
            if(network.stations) {
              stationsLoaded(network)
            }
            else {
              //TODO: Warn about offline mode
            }
          })
        )
      )
    );