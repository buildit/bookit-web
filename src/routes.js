import React from 'react'

import { Route } from 'react-router'

import Loader from './containers/Loader'
import Dashboard from './containers/Dashboard'

const routes = () => (
  <div>
    <Route path="/" exact component={Loader} />
    <Route path="/dashboard" component={Dashboard} />
  </div>
)

export default routes
