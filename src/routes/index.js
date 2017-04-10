
import React from 'react';

import Route from 'react-router/lib/Route';
import IndexRoute from 'react-router/lib/IndexRoute';

import App from '../containers/App';
import Login from '../containers/Login';
import Dashboard from '../containers/Dashboard';

import {
  checkIndexAuthorization,
  checkDashboardAuthorization,
} from '../lib/check-auth';

// Webpack 2 supports ES2015 `System.import` by auto-
// chunking assets. Check out the following for more:
// https://gist.github.com/sokra/27b24881210b56bbaff7#code-splitting-with-es6

// const importLogin = (nextState, cb) => {
//   System.import('../containers/Login')
//   .then(module => cb(null, module.default))
//   .catch((e) => { throw e; });
// };

// const importDashboard = (nextState, cb) => {
//   System.import('../containers/Dashboard')
//   .then(module => cb(null, module.default))
//   .catch((e) => { throw e; });
// };

// We use `getComponent` to dynamically load routes.
// https://github.com/reactjs/react-router/blob/master/docs/guides/DynamicRouting.md
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
  require('../components/03-organisms/Agenda');    // eslint-disable-line global-require
  require('../containers/Login');    // eslint-disable-line global-require
  require('../containers/Dashboard');    // eslint-disable-line global-require
}

export default routes;
