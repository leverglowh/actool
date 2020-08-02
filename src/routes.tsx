import React from 'react';
import {
  Switch
} from 'react-router-dom';
import PrivateRoute from './shared/auth/private-route';

import FishPage from './entities/fish/fish';
import BugsPage from './entities/bugs/bugs';
import LoginModal from './shared/layout/home/login-modal';
import RegisterModal from './shared/layout/home/register-modal';
import Home from './shared/layout/home/home';
import ConnectPage from './shared/auth/connect/connect-page';

const Routes = () => (
    <div id="route-container">
      <Switch>
        <PrivateRoute exact path={['/', '/login', '/register']}>
          <Home />
        </PrivateRoute>
        <PrivateRoute exact path="/connect/:provider">
          <ConnectPage />
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
      <PrivateRoute path="/register">
        <RegisterModal />
      </PrivateRoute>
    </div>
);

export default Routes;
