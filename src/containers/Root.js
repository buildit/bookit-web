import React from 'react'
import PropTypes from 'prop-types'

import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'

import history from '../history'
// import routes from '../routes'

import App from './App'

import './Root.scss'

const Root = ({ store }) => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>
)

Root.propTypes = {
  store: PropTypes.object,
}

export default Root
