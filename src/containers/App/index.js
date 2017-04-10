import React, { PropTypes } from 'react';
// import styles from './styles.scss';

const App = props => (
  <div className="App">
  <h1>App</h1>
    {props.children}
  </div>
);

App.propTypes = {
  children: PropTypes.node,
};

export default App;

