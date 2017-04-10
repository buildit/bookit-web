
import React from 'react';

import Route from 'react-router/lib/Route';
// import IndexRoute from 'react-router/lib/IndexRoute';

import App from '../containers/App';

// Webpack 2 supports ES2015 `System.import` by auto-
// chunking assets. Check out the following for more:
// https://gist.github.com/sokra/27b24881210b56bbaff7#code-splitting-with-es6

const importAgenda = (nextState, cb) => {
  System.import('../components/03-organisms/Agenda')
  .then(module => cb(null, module.default))
  .catch((e) => { throw e; });
};

const importLogin = (nextState, cb) => {
  System.import('../containers/Login')
  .then(module => cb(null, module.default))
  .catch((e) => { throw e; });
};

// We use `getComponent` to dynamically load routes.
// https://github.com/reactjs/react-router/blob/master/docs/guides/DynamicRouting.md
const routes = (
  <Route path="/" component={App}>
    <Route path="login" getComponent={importLogin} />
    <Route getComponent={importAgenda} />
  </Route>
);

// Unfortunately, HMR breaks when we dynamically resolve
// routes so we need to require them here as a workaround.
// https://github.com/gaearon/react-hot-loader/issues/288
if (module.hot) {
  require('../components/03-organisms/Agenda');    // eslint-disable-line global-require
  require('../containers/Login');    // eslint-disable-line global-require
}

export default routes;
