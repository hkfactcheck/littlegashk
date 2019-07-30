import React from 'react';
import { Route } from 'react-router-dom';
import { Switch } from 'react-router';
import Home from './Home';
import DistrictBoard from './DistrictBoard';
import Person from './Person';

export default () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/district/:district" component={DistrictBoard} />
    <Route path="/person/:pid/:name" component={Person} />
  </Switch>
);
