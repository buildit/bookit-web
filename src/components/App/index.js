
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Link from 'react-router/lib/Link';
import styles from './styles.scss';
import updateMessage from '../../actions';

export const AppInner = ({ children }) => (
  <div>
    <i className={styles.logo} />
    <ul className={styles.nav}>
      <li className={styles.navItem}>
        <Link className={styles.link} to="/">Home</Link>
      </li>
      <li className={styles.navItem}>
        <Link className={styles.link} to="/tools">Tools</Link>
      </li>
    </ul>
    <div className={styles.content}>
      {children}
    </div>
  </div>
);

AppInner.propTypes = {
  children: PropTypes.node,
};

const mapStateToProps = state => ({
  message: state.message,
});


const mapDispatchToProps = dispatch => ({
  onMessageClick: () => {
    dispatch(updateMessage());
  },
  onUserFetchRequest: () => {
    dispatch({ type: 'USER_FETCH_REQUESTED', payload: { userId: 'aww' } });
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AppInner);
