import { createStore, combineReducers, applyMiddleware, compose } from 'redux'

import { routerReducer, routerMiddleware } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'

import createSagaMiddleware from 'redux-saga'

import history from './history'
import reducers from './reducers'
import sagaManager from './sagas'

const makeRootReducer = reducers => combineReducers({
  ...reducers,
  router: routerReducer,
  form: formReducer,
})

const sagaMiddleware = createSagaMiddleware()
const routeReduxMiddleware = routerMiddleware(history)

const middlewares = [routeReduxMiddleware, sagaMiddleware]

const storeEnhancers = []

const middlewareEnhancer = applyMiddleware(...middlewares)
storeEnhancers.unshift(middlewareEnhancer)

export default (initialState) => {
  const composer = (window ? (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose) : compose)

  const store = createStore(
    makeRootReducer(reducers),
    initialState,
    composer(...storeEnhancers)
  )

  sagaManager.startSagas(sagaMiddleware)

  if (module.hot) {
    module.hot.accept('./reducers', () => store.replaceReducer(makeRootReducer(reducers)))

    // This is murky and unverified - need contrived saga example to verify
    module.hot.accept('./sagas', () => {
      sagaManager.cancelSagas(store)
      sagaManager.startSagas(sagaMiddleware)
    })
  }

  return store
}
