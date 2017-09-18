import React from 'react'
import PropTypes from 'prop-types'

import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'

import { Route } from 'react-router'

import history from '../history'

import App from './App'

import './Root.scss'

const Root = ({ store }) => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Route path="/" component={App} />
    </ConnectedRouter>
  </Provider>
)

Root.propTypes = {
  store: PropTypes.object,
}

export default Root
