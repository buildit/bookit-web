import React from 'react'
import PropTypes from 'prop-types'

import { Route } from 'react-router'

import Link from '../../01-atoms/Link'

export const ConditionalRouteLink = ({ path, to, ...props }) => (
  <Route path={path} exact={true} children={({ match }) => ( // eslint-disable-line react/no-children-prop
    (match && <Link to={to} {...props} />)
  )}/>
)

ConditionalRouteLink.propTypes = {
  path: PropTypes.string.isRequired,
  to: Link.propTypes.to,
}

export default ConditionalRouteLink
