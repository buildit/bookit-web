
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducer from './reducers';

const configureStore = (initialState) => {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(reducer, initialState, applyMiddleware(sagaMiddleware));

  return Object.assign({}, store, {
    runSaga: sagaMiddleware.run,
  });
};

export default configureStore;
