import React from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'

import { Route, Redirect } from 'react-router'

import { getUser } from '../selectors'

export const ProtectedRoute = ({ component: Component, authTest, user, dispatch, failTo, ...rest }) => (
  <Route {...rest} render={props => (
    authTest(user, dispatch) ? (
      <Component {...props} />
    ) : (
      <Redirect to={{
        pathname: failTo,
        state: { from: props.location },
      }} />
    )
  )} />
)


ProtectedRoute.propTypes = {
  component: PropTypes.func,
  authTest: PropTypes.func,
  user: PropTypes.object,
  dispatch: PropTypes.func,
  failTo: PropTypes.string,
  location: PropTypes.object,
}

const mapStateToProps = state => ({ user: getUser(state) })

export default connect(mapStateToProps)(ProtectedRoute)
