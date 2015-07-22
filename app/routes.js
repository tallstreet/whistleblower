import React from 'react';
import {Route} from 'react-router';
import App from './components/Application';
import Form from './components/Form';
import Timer from './components/Timer';
import NotFound from './components/NotFound';

export default (
  <Route component={App}>
    <Route path="/" component={Form}/>
    <Route path="/countdown" component={Timer}/>
    <Route path="*" component={NotFound}/>
  </Route>
);
