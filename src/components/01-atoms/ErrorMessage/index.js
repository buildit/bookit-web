import React, { PropTypes } from 'react';
import styles from './styles.scss';

const ErrorMessage = ({ message }) => (
  <div className={styles.message}>{ message }</div>
);

export default ErrorMessage;

ErrorMessage.propTypes = {
  message: PropTypes.arrayOf(PropTypes.string),
};
