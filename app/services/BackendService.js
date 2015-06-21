import { BehaviorSubject, AsyncSubject } from "rx";
import React from "react/addons";
import { formActions } from "../actions/FormCreators";
import { startTimer } from "../actions/TimerCreators";
import { POST } from "../const/actions";
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

function handlePost(evt) {
  var post = new AsyncSubject();

  backendStore.onNext(update(backendStore.value, {
    req: { $set: evt.value },
    loading: { $set: true },
  }));

  fetch('http://localhost:5000/api/v1/add', {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(evt.value),
  }).then((resp) => {
    return resp.json();
  }).then((resp) => {
    post.onNext(update(backendStore.value, {
      resp: { $set: resp },
      loading: { $set: false },
    }));
    startTimer(evt.value.account, evt.value.amount);
    post.onCompleted();
  });

  return post;
}

formActions.filter((evt) => evt.type === POST)
  .map(handlePost)
  .concatAll()
  .forEach(backendStore);

/** @return {Rx.Observable} */
export function observeBackend() {
  return backendStore;
}
