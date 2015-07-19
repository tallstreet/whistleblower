import { BehaviorSubject, AsyncSubject } from "rx";
import React from "react/addons";
import { formActions } from "../actions/FormCreators";
import { startTimer } from "../actions/TimerCreators";
import { POST } from "../constants/actions";
import "whatwg-fetch";
import "es6-promise";

/** @type {Function} */
var update = React.addons.update;

var backendStore = new BehaviorSubject({
  resp: {},
  req: {},
  loading: false,
  error: false,
});


formActions.filter((evt) => evt.type === POST)
  .map(handlePost)
  .concatAll()
  .forEach(backendStore);

/** @return {Rx.Observable} */
export function observeBackend() {
  return backendStore;
}
