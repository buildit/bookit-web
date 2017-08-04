import React from 'react'
import PropTypes from 'prop-types'

import Link from '../../01-atoms/Link'
import ConditionalRouteLink from '../ConditionalRouteLink'

import { isAdmin } from '../../../utils/check-auth'

import styles from './styles.scss'

const Header = ({ user, logout }) => (
  <header className={styles.header}>
    <span className={styles.hello}>Hello</span>
    <span className={styles.name}>
      { user.name }!
    </span>
    { isAdmin(user) ? <ConditionalRouteLink path="/" to="/admin" className={styles.link}>Manage Users</ConditionalRouteLink> : '' }
    <ConditionalRouteLink path="/admin" to="/" className={styles.link}>Manage Rooms</ConditionalRouteLink>
    <Link to="/login" className={styles.link} onClick={logout}>Log Out</Link>
  </header>
)

Header.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }),
  logout: PropTypes.func.isRequired,
}

export default Header
