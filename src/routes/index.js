
import React from 'react';

import IndexRoute from 'react-router/lib/IndexRoute';
import Route from 'react-router/lib/Route';

import App from 'containers/App';
import Login from 'containers/Login';
import Dashboard from 'containers/Dashboard';

import {
  checkIndexAuthorization,
  checkDashboardAuthorization,
} from 'lib/check-auth';

const routes = store => (
  <Route path="/" component={App}>
    <IndexRoute onEnter={checkIndexAuthorization(store)} />
    <Route path="/login" component={Login} />
    <Route onEnter={checkDashboardAuthorization(store)} path="/dashboard" component={Dashboard} />
  </Route>
);

// Unfortunately, HMR breaks when we dynamically resolve
// routes so we need to require them here as a workaround.
// https://github.com/gaearon/react-hot-loader/issues/288
if (module.hot) {
  require('components/03-organisms/Agenda');    // eslint-disable-line global-require
  require('containers/Login');    // eslint-disable-line global-require
  require('containers/Dashboard');    // eslint-disable-line global-require
}

export default routes;
