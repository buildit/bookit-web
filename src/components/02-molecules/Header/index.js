import React from 'react'
import PropTypes from 'prop-types'

import Link from '../../01-atoms/Link'

import styles from './styles.scss'

const Header = ({ user, logout }) => (
  <header className={styles.header}>
    <span className={styles.hello}>Hello</span>
    <span className={styles.name}>
      { user.name }!
    </span>
    <Link to="/admin" className={styles.link}>Admin</Link>
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
