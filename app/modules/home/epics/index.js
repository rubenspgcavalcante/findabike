import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/mergeMap";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/startWith";
import "rxjs/add/operator/scan";
import "rxjs/add/observable/of";
import "rxjs/add/observable/fromPromise";
import "rxjs/add/observable/empty";
import "rxjs/add/observable/dom/ajax";

import { cbAPI } from "../../commons/utils/APIs";
import db from "../../commons/cache/db";
import { NETWORKS_LOADED, PLACE_LOADED, searchLock } from "../../commons/epics/index";
import { openModal } from "../../commons/epics/modal";

export const CITY_SELECTED = 'CITY_SELECTED';
export const STATIONS_LOADED = 'STATIONS_LOADED';

export const SEARCH_CHANGE = 'SEARCH_CHANGE';
export const SUGGESTIONS_CHANGE = 'SUGGESTIONS_CHANGE';

export const TOGGLE_MAP_FULLSCREEN = "TOGGLE_MAP_FULLSCREEN";

export const citySelected = (network) => ({ type: CITY_SELECTED, payload: network });
export const stationsLoaded = (network) => ({ type: STATIONS_LOADED, payload: network });
export const toggleMapFullscreen = () => ({ type: TOGGLE_MAP_FULLSCREEN });

export const searchChange = (search) => ({ type: SEARCH_CHANGE, payload: search });
export const suggestionsChange = (suggestions) => ({ type: SUGGESTIONS_CHANGE, payload: suggestions });

const autoSearchLockOff$ = Observable.of(searchLock(false));

const autoSelect$ = (network) => Observable.concat(
  autoSearchLockOff$,
  Observable.of(citySelected(network))
);

export const autoSelectCityEpic = action$ =>
  action$
    .ofType(NETWORKS_LOADED, PLACE_LOADED)
    .scan((acc, seed) => {
      const copy = { ...acc };
      if (seed.type === NETWORKS_LOADED) {
        copy.networks = seed.payload;
      }
      else if (seed.type === PLACE_LOADED) {
        copy.place = seed.payload;
      }

      return copy;
    }, { networks: null, place: null })
    .mergeMap(({ networks, place }) => {
      if (networks !== null && place !== null) {
        const matched = networks.filter(({ location }) => location.city === place.address.state);
        if (matched.length === 1) {
          return autoSelect$(matched[0]);
        }
        else if (matched.length > 1) {
          return Observable.of(openModal({
            title: `Choose a provider in ${place.address.state}`,
            type: 'ChooseProvider',
            content: matched
          }))
        }
        return autoSearchLockOff$;
      }

      return Observable.empty();
    });

export const citySelectedEpic = action$ =>
  action$
    .ofType(CITY_SELECTED)
    .mergeMap(action =>
      Observable.ajax({
        url: cbAPI(`networks/${action.payload.id}`),
        method: 'GET',
        responseType: 'json',
        crossDomain: true
      }).map(({ response, status }) => {
          if (status <= 400) {
            db.networks.update({ id: action.payload.id }, response.network);
            return stationsLoaded(response.network);
          }
        }
      ).catch((err) =>
        Observable.fromPromise(
          db.networks.where("id").equals(action.payload.id).first().then(network => {
            if (network.stations) {
              stationsLoaded(network)
            }
            else {
              //TODO: Warn about offline mode
            }
          })
        )
      )
    );