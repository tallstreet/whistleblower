import React, { Component } from 'react';
import Application from '../components/Application';
import { Provider } from 'react-redux';
import { createRedux, createDispatcher, composeStores } from 'redux';
import promiseMiddleware from '../middleware/promise';
import observableMiddleware from '../middleware/observable';
import * as stores from '../stores/index';

// Compose all your Stores into a single Store function with `composeStores`:
const store = composeStores(stores);

// Create a Dispatcher function for your composite Store:
const dispatcher = createDispatcher(
  store,
  getState => [promiseMiddleware(getState), observableMiddleware(getState)]
);

// Create a Redux instance using the dispatcher function:
export const redux = createRedux(dispatcher);

class App extends Component {
  render() {
    return (
      <Provider redux={redux}>
        {() => <Application />}
      </Provider>
    );
  }
}


export default function application() {
  React.render(
    <App />,
    document.getElementById('app')
  );
}
