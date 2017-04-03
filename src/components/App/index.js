import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import styles from './styles.scss';

export const AppInner = ({ children }) => (
  <div className={styles.content}>
    {children}
  </div>
);

AppInner.propTypes = {
  children: PropTypes.node,
};

const mapStateToProps = state => ({
  message: state.message,
});


const mapDispatchToProps = dispatch => ({
  onUserFetchRequest: () => {
    dispatch({ type: 'USER_FETCH_REQUESTED', payload: { userId: 'aww' } });
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AppInner);
