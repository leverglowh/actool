import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = props => {
  const hemiOk = localStorage.getItem('hemi') !== null;
  if (hemiOk) return <Route {...props}/>
  else return <Redirect to="/" />
}

export default PrivateRoute;
