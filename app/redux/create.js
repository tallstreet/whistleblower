/* global __DEVELOPMENT__, __CLIENT__, __DEVTOOLS__ */
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import observable from './observable';
import promise from './promise';
import * as reducers from '../stores/index';
const reducer = combineReducers(reducers);

export default function(client, data) {
  let finalCreateStore;
  if (__DEVELOPMENT__ && __CLIENT__ && __DEVTOOLS__) {
    const { devTools, persistState } = require('redux-devtools');
    finalCreateStore = compose(
      applyMiddleware(promise(client)),
      applyMiddleware(observable),
      devTools(),
      persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/)),
      createStore
    );
  } else {
    finalCreateStore = compose(
      applyMiddleware(promise(client)),
      applyMiddleware(observable),
      createStore
    );
  }
  return finalCreateStore(reducer, data);
}
