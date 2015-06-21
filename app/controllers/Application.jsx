import React from "react";
import Application from "../components/Application";
import { Observable } from "rx";

import {
  observeBackend
} from "../services/BackendService";


import {
  observeTimer
} from "../services/TimerService";


const DEBOUNCE_INTERVAL = 1000 / 60;

var render = function(backend, timer) {
  React.render(
    <Application
      backend={backend}
      timer={timer} />,
    document.getElementById("app")
  );
};

export default function() {
  var source = Observable.combineLatest(observeBackend(), observeTimer(), (...args) => args);

  source
    .debounce(DEBOUNCE_INTERVAL)
    .forEach(function(args) {
      render(args[0], args[1]);
    });

}
