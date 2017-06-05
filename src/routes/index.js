
import React from 'react';

import IndexRoute from 'react-router/lib/IndexRoute';
import Route from 'react-router/lib/Route';

import App from '../containers/App';
import Login from '../containers/Login';
import Dashboard from '../containers/Dashboard';
import Admin from '../containers/Admin';
import Forbidden from '../containers/Forbidden';

import * as auth from '../lib/check-auth';

const routes = store => (
  <Route path="/" component={App}>
    <IndexRoute onEnter={auth.checkIndexAuthorization(store)} />
    <Route onEnter={auth.checkAdminAuthorization(store)} path="/admin" component={Admin} />
    <Route path="/login" component={Login} />
    <Route path="/forbidden" component={Forbidden} />
    <Route onEnter={auth.checkDashboardAuthorization(store)} path="/dashboard" component={Dashboard} />
  </Route>
);

// Unfortunately, HMR breaks when we dynamically resolve
// routes so we need to require them here as a workaround.
// https://github.com/gaearon/react-hot-loader/issues/288
if (module.hot) {
  require('../components/03-organisms/Agenda');    // eslint-disable-line global-require
  require('../containers/Login');    // eslint-disable-line global-require
  require('../containers/Dashboard');    // eslint-disable-line global-require
  require('../containers/Forbidden'); // eslint-disable-line global-require
  require('../containers/Admin'); // eslint-disable-line global-require
}

export default routes;
