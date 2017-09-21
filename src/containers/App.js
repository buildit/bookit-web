import React from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'

import { TransitionGroup, CSSTransition } from 'react-transition-group'

import { Route, Switch } from 'react-router'

import Loader from './Loader'
import Login from './Login'
import Dashboard from './Dashboard'

import Refresh from './Refresh'

import { isAuthRefreshNeeded } from '../selectors'

// Refresh component will be used to attempt silent refresh of user's
// authentication token - for now we're not going to do it since the
// saga we will need to make this work will be kinda complex
// import Refresh from './Refresh'

import CirclesSpinner from '../components/CirclesSpinner'

const Button = ({ toggleLogin, disabled, children }) => (  // eslint-disable-line
  <button onClick={toggleLogin} disabled={disabled} style={{ backgroundColor: '#2672ec', color: '#fff', fontWeight: 'bold' }}>
    { children }
  </button>
)

export const App = props => (
  <div>
    <TransitionGroup component="div" className="app-main">
      <CSSTransition key={props.location.pathname} timeout={{ enter: 1000, exit: 200 }} classNames="fade" appear>
        <Switch location={props.location}>
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/" render={() => (
              <Loader>
                <Route path="/" exact component={CirclesSpinner} />
                <Route path="/login" render={() => (
                  <Login>
                    <Button>SIGN IN WITH MICROSOFT</Button>
                  </Login>
                )} />
              </Loader>
            )} />
        </Switch>
      </CSSTransition>
    </TransitionGroup>
    { props.isAuthRefreshNeeded && <Refresh /> }
  </div>
)

App.propTypes = {
  location: PropTypes.any,
  isAuthRefreshNeeded: PropTypes.bool,
}

export default connect(state => ({
  isAuthRefreshNeeded: isAuthRefreshNeeded(state),
}))(App)
