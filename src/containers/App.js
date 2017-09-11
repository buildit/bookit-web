import React from 'react'
import PropTypes from 'prop-types'

import { withRouter, Route, Switch } from 'react-router'

import { TransitionGroup, CSSTransition } from 'react-transition-group'

import Loader from './Loader'
import Login from './Login'
import Dashboard from './Dashboard'
// import Refresh from './Refresh'

import CirclesSpinner from '../components/CirclesSpinner'

const Button = ({ toggleLogin, disabled, children }) => (  // eslint-disable-line
  <button onClick={toggleLogin} disabled={disabled} style={{ backgroundColor: '#2672ec', color: '#fff', fontWeight: 'bold' }}>
    { children }
  </button>
)

export const App = ({ location }) => {
  const currentKey = location.pathname.split('/')[1] || '/'
  const timeout = { enter: 1000, exit: 200 }

  return (
    <TransitionGroup component="div" className="app-main">
      <CSSTransition key={currentKey} timeout={timeout} classNames="fade" appear>
        <Switch location={location}>
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
  )
}

App.propTypes = {
  location: PropTypes.any,
}

export default withRouter(App)
