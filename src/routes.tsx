import React from 'react';
import {
  BrowserRouter as Router,
  Switch
} from 'react-router-dom';
import FishPage from './entities/fish/fish';
import BugsPage from './entities/bugs/bugs';
import PrivateRoute from './shared/auth/private-route';
import Home from './shared/layout/home/home';

const Routes = () => (
  <Router>
    <div id="route-container">
      <Switch>
        <PrivateRoute path="/" exact>
          <Home />
        </PrivateRoute>
        <PrivateRoute path="/fish">
          <FishPage />
        </PrivateRoute>
        <PrivateRoute path="/bugs">
          <BugsPage />
        </PrivateRoute>
      </Switch>
    </div>
  </Router>
);

export default Routes;
