import React from 'react';
import {
  Switch
} from 'react-router-dom';
import PrivateRoute from './shared/auth/private-route';

import FishPage from './entities/fish/fish';
import BugsPage from './entities/bugs/bugs';
import LoginModal from './shared/layout/home/login-modal';
import Home from './shared/layout/home/home';

const Routes = () => (
    <div id="route-container">
      <Switch>
        <PrivateRoute exact path={['/', '/login']}>
          <Home />
        </PrivateRoute>
        <PrivateRoute path="/auth/callback/">
          <div>
            xiao
          </div>
        </PrivateRoute>
        <PrivateRoute path="/fish">
          <FishPage />
        </PrivateRoute>
        <PrivateRoute path="/bugs">
          <BugsPage />
        </PrivateRoute>
      </Switch>
      <PrivateRoute path="/login">
        <LoginModal />
      </PrivateRoute>
    </div>
);

export default Routes;
