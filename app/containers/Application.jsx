import React, { Component } from 'react';
import Application from '../components/Application';
import { Provider } from 'redux/react';


import { createRedux, createDispatcher, composeStores } from 'redux';
import promiseMiddleware from '../middleware/promise';
import * as stores from '../stores/index';

// Compose all your Stores into a single Store function with `composeStores`:
const store = composeStores(stores);

// Create a Dispatcher function for your composite Store:
const dispatcher = createDispatcher(
  store,
  getState => [promiseMiddleware(getState)] // Pass the default middleware
);

// Create a Redux instance using the dispatcher function:
const redux = createRedux(dispatcher);

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
