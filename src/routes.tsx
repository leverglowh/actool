import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import FishPage from './entities/fish/fish';
import BugsPage from './entities/bugs/bugs';

const Routes = () => (
  <Router>
      <Switch>
        <Route path="/fish">
          <FishPage />
        </Route>
        <Route path="/bugs">
          <BugsPage />
        </Route>
      </Switch>
  </Router>
);

export default Routes;
