import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/mergeMap";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/concat";
import "rxjs/add/observable/of";
import "rxjs/add/observable/fromPromise";
import "rxjs/add/observable/dom/ajax";

import { cbAPI, nomiAPI } from "../utils/APIs";
import db from "../cache/db";

export const APP_BOOTSTRAP = 'APP_START';
export const NETWORKS_LOADED = 'NETWORKS_LOADED';

export const LOCATION_LOADED = 'LOCATION_LOADED';

export const PLACE_LOADED = 'PLACE_LOADED';
export const AUTO_SEARCH_LOCK = 'AUTO_SEARCH_LOCK';

export const PERSISTENT_STORAGE = 'PERSISTENT_STORAGE';

export const appBootstrap = () => ({ type: APP_BOOTSTRAP });
export const networksLoaded = (payload) => ({ type: NETWORKS_LOADED, payload });

export const locationLoaded = (payload) => ({ type: LOCATION_LOADED, payload });

export const placeLoaded = (payload) => ({ type: PLACE_LOADED, payload });

export const autoSearchLock = (lock = true) => ({ type: AUTO_SEARCH_LOCK, payload: lock });

export const setPersitentStorage = (enabled = false) => ({ type: PERSISTENT_STORAGE, payload: enabled });

const getLocation$ = Observable.create(observer => {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(coords => {
      observer.next(coords);
      observer.complete();
    }, error => {
      observer.error(error);
    });
  }
  else {
    observer.error({ message: 'Geolocation API not available' });
  }
});

export const loadLocationEpic = action$ =>
  Observable.concat(
    Observable.of(autoSearchLock(true)),
    action$.ofType(APP_BOOTSTRAP)
      .mergeMap(action =>
        getLocation$.mergeMap(
          ({ coords: { latitude, longitude } }) => {
            return locationLoaded({ latitude, longitude });
          }
        ).catch(err => Observable.of(autoSearchLock(false)))
      ));

export const loadPlaceEpic = action$ =>
  action$.ofType(LOCATION_LOADED)
    .mergeMap(({ payload }) =>
      Observable.ajax({
        url: nomiAPI(`reverse?format=json&lat=${payload.latitude}&lon=${payload.longitude}`),
        method: 'GET',
        responseType: 'json',
        crossDomain: true
      }).map(({ response, status }) => {
        if (status <= 400) {
          return placeLoaded(response);
        }
        else {
          console.warn(`Couldn't load reversal geo location: Error ${status} - ${response}`);
          return autoSearchLock(false);
        }
      }).catch(err => autoSearchLock(false))
    );

export const loadNetworksEpic = action$ =>
  action$.ofType(APP_BOOTSTRAP)
    .mergeMap(action =>
      Observable.ajax({
        url: cbAPI`networks`,
        method: 'GET',
        responseType: 'json',
        crossDomain: true
      }).map(({ response, status }) => {
          if (status <= 400) {
            db.networks.bulkPut(response.networks);
            return networksLoaded(response.networks);
          }
        }
      ).catch((err) =>
        Observable.fromPromise(
          db.networks.toArray().then(networks => networksLoaded(networks))
        )
      )
    );

export const setPersistentStorageEpic = action$ =>
  action$.ofType(APP_BOOTSTRAP)
    .mergeMap(action => {
      if (navigator.storage && navigator.storage.persist)
        return Observable.fromPromise(navigator.storage.persist().then(setPersitentStorage));
    });