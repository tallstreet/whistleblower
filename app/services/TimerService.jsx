import { BehaviorSubject, Observable } from "rx";
import React from "react/addons";
import { START_TIMER } from "../const/actions";
import { timerActions } from "../actions/TimerCreators";
import "whatwg-fetch";
import "es6-promise";

/** @type {Function} */
var update = React.addons.update;

const TIMEOUT = 60;
var timerStore = new BehaviorSubject({
  timeLeft: TIMEOUT,
  started: false,
  account: '',
  amount: 0,
  result: false,
});

function handleTick(evt) {
  return update(timerStore.value, {
    timeLeft: { $set: TIMEOUT - evt },
  });
}


function handleEnd() {

  fetch(`http://4c4b2841.ngrok.com/nxt?requestType=getBalance&account=${timerStore.value.account}`).then((resp) => {
    return resp.json();
  }).then((resp) => {
    let result;
    if (resp.balanceNQT / 10000000000 < timerStore.value.amount) {
      result = { $set: true};
    } else {
      result = { $set: false};
    }
    return timerStore.onNext(update(timerStore.value, {
      timeLeft: { $set: 0 },
      result,
    }));
  });

  return timerStore.value;
}

function handleStart(evt) {
  Observable.timer(1000, 1000)
    .map(handleTick)
    .take(TIMEOUT)
    .doOnCompleted(handleEnd)
    .subscribe(timerStore);

  return update(timerStore.value, {
    started: { $set: true },
    account: { $set: evt.account },
    amount: { $set: evt.amount },
  });
}

timerActions.filter((evt) => evt.type === START_TIMER)
  .map(handleStart)
  .forEach(timerStore);


/** @return {Rx.Observable} */
export function observeTimer() {
  return timerStore;
}
