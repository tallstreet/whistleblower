/* global __DEVTOOLS__ */

// IMPORTANT: This needs to be first (before any other components)
// to get around CSS order randomness in webpack.
require('./index.scss');

import React from 'react';
import BrowserHistory from 'react-router/lib/BrowserHistory';
import Location from 'react-router/lib/Location';
import createStore from './redux/create';
import ApiClient from './ApiClient';
import universalRouter from './universalRouter';
const history = new BrowserHistory();
const client = new ApiClient();

const dest = document.getElementById('content');
export const redux = createStore(client, window.__data);
const location = new Location(document.location.pathname, document.location.search);
universalRouter(location, history, redux)
  .then((component) => {
    if (__DEVTOOLS__) {
      const { DevTools, DebugPanel, LogMonitor } = require('redux-devtools/lib/react');
      console.info('You will see a "Warning: React attempted to reuse markup in a container but the checksum was' +
        ' invalid." message. That\'s because the redux-devtools are enabled.');
      React.render(<div>
        {component}
        <DebugPanel top right bottom key="debugPanel">
          <DevTools store={redux} monitor={LogMonitor}/>
        </DebugPanel>
      </div>, dest);
    } else {
      React.render(component, dest);
    }
  }, (error) => {
    console.error(error);
  });


if (process.env.NODE_ENV !== 'production') {
  window.React = React; // enable debugger
  const reactRoot = window.document.getElementById('content');

  if (!reactRoot || !reactRoot.firstChild || !reactRoot.firstChild.attributes || !reactRoot.firstChild.attributes['data-react-checksum']) {
    console.error('Server-side React render was discarded. Make sure that your initial render does not contain any client-side code.');
  }
}
