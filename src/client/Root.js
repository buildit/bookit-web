
import React from 'react';
import Router from 'react-router/lib/Router';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import browserHistory from 'react-router/lib/browserHistory';
import routes from '../routes';
import reducer from '../reducers';

const store = createStore(reducer);

// We need a Root component for React Hot Loading.
function Root() {
  return (
    <Provider store={store}>
      <Router history={browserHistory} routes={routes} />
    </Provider>
  );
}

export default Root;
