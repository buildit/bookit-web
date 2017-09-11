import React from 'react'

import { Route } from 'react-router'

import Loader from './containers/Loader'
import Login from './containers/Login'
import Dashboard from './containers/Dashboard'

const routes = () => (
  <div>
    <Route path="/" exact component={Loader} />
    <Route path="/login" component={Login} />
    <Route path="/dashboard" component={Dashboard} />
  </div>
)

export default routes
