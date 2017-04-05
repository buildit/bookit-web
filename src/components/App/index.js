import React, { PropTypes } from 'react';
import styles from './styles.scss';

const App = ({ children }) => (
  <div className={styles.content}>
    {children}
  </div>
);

App.propTypes = {
  children: PropTypes.node,
};

export default App;
