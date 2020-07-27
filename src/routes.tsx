import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import FishPage from './entities/fish/fish';

const Routes = () => (
  <Router>
      <Switch>
        <Route path="/fish">
          <FishPage />
        </Route>
      </Switch>
  </Router>
);

export default Routes;
