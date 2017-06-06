import React, { PropTypes } from 'react';
import styles from './styles.scss';

const Header = ({ user, logout }) => (
  <header className={styles.header}>
    <span className={styles.hello}>Hello</span>
    <span className={styles.name}>
      { user.name }!
    </span>
    <span className={styles.logout} onClick={logout}>Log Out</span>
  </header>
);

Header.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }),
  logout: PropTypes.func.isRequired,
};

export default Header;
