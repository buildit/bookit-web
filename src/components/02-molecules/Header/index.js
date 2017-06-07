import React, { PropTypes } from 'react';
import { browserHistory } from 'react-router';
import styles from './styles.scss';


const Header = ({ user, logout }) => (
  <header className={styles.header}>
    <span className={styles.hello}>Hello</span>
    <span className={styles.name}>
      { user.name }!
    </span>
    <span className={styles.link} onClick={() => browserHistory.push('/admin')}>Admin</span>
    <span className={styles.link} onClick={logout}>Log Out</span>
  </header>
);

Header.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }),
  logout: PropTypes.func.isRequired,
};

export default Header;
