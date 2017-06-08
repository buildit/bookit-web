import React from 'react'
import PropTypes from 'prop-types'

import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import bookitTheme from './bookitTheme'

import history from '../history'
import routes from '../routes'

const Root = ({ store }) => (
  <MuiThemeProvider muiTheme={getMuiTheme(bookitTheme)}>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        { routes(store) }
      </ConnectedRouter>
    </Provider>
  </MuiThemeProvider>
)

Root.propTypes = {
  store: PropTypes.object,
}

export default Root
