import React from 'react'

import { Route, Switch } from 'react-router'

import Loader from './Loader'
import Login from './Login'
// import Refresh from './Refresh'

import CirclesSpinner from '../components/CirclesSpinner'

import Dashboard from './Dashboard'


const Button = ({ toggleLogin, disabled, children }) => (  // eslint-disable-line
  <button onClick={toggleLogin} disabled={disabled} style={{ backgroundColor: '#2672ec', color: '#fff', fontWeight: 'bold' }}>
    { children }
  </button>
)

export const App = () => (
  <div>
    <Switch>
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
  </div>
)

export default App
