
import React from 'react';
import Router from 'react-router/lib/Router';
import { Provider } from 'react-redux';
import browserHistory from 'react-router/lib/browserHistory';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import configureStore from '../configureStore';
import routes from '../routes';
import rootSaga from '../sagas';

const store = configureStore();
store.runSaga(rootSaga);

// We need a Root component for React Hot Loading.
function Root() {
  return (
    <MuiThemeProvider>
      <Provider store={store}>
        <Router history={browserHistory} routes={routes} />
      </Provider>
    </MuiThemeProvider>
  );
}

export default Root;
