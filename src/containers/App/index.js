import React, { PropTypes } from 'react';
import { Link } from 'react-router';
// import styles from './styles.scss';

const App = props => (
  <div className="App">
  <h1>App</h1>
    {props.children}
  <Link to="/login">Login</Link>
  </div>
);

App.propTypes = {
  children: PropTypes.node,
};

export default App;

