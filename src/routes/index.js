import React from 'react'

import { Switch, Route } from 'react-router'

import ProtectedRoute from './ProtectedRoute'

import Dashboard from '../containers/Dashboard'
import Admin from '../containers/Admin'
import Login from '../containers/Login'
import Forbidden from '../containers/Forbidden'
import OpenId from '../containers/OpenId'

import { isAuthorizedUser, isAuthorizedAdmin } from '../utils/check-auth'

import styles from '../containers/App/styles.scss'

const routes = () => (
  <div className={styles.app}>
    <Switch>
      <ProtectedRoute exact path="/" component={Dashboard} authTest={isAuthorizedUser} failTo="/login" />
      <ProtectedRoute exact path="/admin" component={Admin} authTest={isAuthorizedAdmin} failTo="/forbidden" />
      <Route exact path="/login" component={Login} />
      <Route exact path="/openid-complete" component={OpenId} />
      <Route exact path="/forbidden" component={Forbidden} />
    </Switch>
  </div>
)

export default routes
