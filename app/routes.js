import React from 'react';
import {Route} from 'react-router';
import ApplicationContainer from './components/Application';
import Form from './components/Form';
import NotFound from './components/NotFound';

export default (
  <Route component={ApplicationContainer}>
    <Route path="/" component={Form}/>
    <Route path="*" component={NotFound}/>
  </Route>
);
