import React from 'react';
import { Route, IndexRoute } from 'react-router';

import Application from './components/Application';
import NotFoundPage from './components/pages/not-found-page';

import HomePage from './components/pages/home-page';
import Register from './components/auth/register';
import Login from './components/auth/login';
import Dashboard from './components/dashboard';
// import RequireAuth from './components/auth/require-auth';

export default (
  <Route path="/" component={Application}>
    <IndexRoute component={HomePage} />
    <Route path="register" component={Register} />
    <Route path="login" component={Login} />
    <Route path="dashboard" component={Dashboard} />
    <Route path="*" component={NotFoundPage} />
  </Route>
);

//     <Route path="dashboard" component={RequireAuth(Dashboard)} />
