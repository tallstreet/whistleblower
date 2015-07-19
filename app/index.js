// IMPORTANT: This needs to be first (before any other components)
// to get around CSS order randomness in webpack.
require('./index.scss');

// Some ES6+ features require the babel polyfill
// More info here: https://babeljs.io/docs/usage/polyfill/
// Uncomment the following line to enable the polyfill
// require("babel/polyfill");

import { Observable } from 'rx';
import { application } from './containers';

Observable.fromEvent(document, 'DOMContentLoaded')
    .first()
    .forEach(
        () => application(),
        err => console.log(err.stack)
    );
