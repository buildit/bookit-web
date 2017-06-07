import React from 'react'
import PropTypes from 'prop-types'

import history from '../../../history'

import styles from './styles.scss'

const Header = ({ user, logout }) => (
  <header className={styles.header}>
    <span className={styles.hello}>Hello</span>
    <span className={styles.name}>
      { user.name }!
    </span>
    <span className={styles.link} onClick={() => history.push('/admin')}>Admin</span>
    <span className={styles.link} onClick={logout}>Log Out</span>
  </header>
)

Header.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }),
  logout: PropTypes.func.isRequired,
}

export default Header
