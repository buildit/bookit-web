import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducer from './reducers';

const configureStore = (initialState) => {
  const sagaMiddleware = createSagaMiddleware.default();

  /* eslint-disable no-underscore-dangle */
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(reducer, initialState, composeEnhancers(
   applyMiddleware(sagaMiddleware)
 ));
 /* eslint-enable */

  return Object.assign({}, store, {
    runSaga: sagaMiddleware.run,
  });
};

export default configureStore;
