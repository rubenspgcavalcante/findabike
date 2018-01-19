import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/mergeMap";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/fromPromise";
import "rxjs/add/observable/dom/ajax";

import { cbAPI } from "../utils/citybikes";
import db from "../cache/db";

export const APP_BOOTSTRAP = 'APP_START';
export const APP_BOOTSTRAP_FINISHED = 'APP_BOOTSTRAP_FINISHED';

export const appBootstrap = () => ({ type: APP_BOOTSTRAP });
export const appBootstrapFinished = (payload) => ({ type: APP_BOOTSTRAP_FINISHED, payload });

export const appBootstrapEpic = action$ =>
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
            return appBootstrapFinished(response.networks);
          }
        }
      ).catch((err) =>
        Observable.fromPromise(
          db.networks.toArray().then(networks => appBootstrapFinished(networks))
        )
      )
    );