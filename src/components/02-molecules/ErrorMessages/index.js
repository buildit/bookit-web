import React, { PropTypes } from 'react';
import styles from './styles.scss';
import ErrorMessage from '../../01-atoms/ErrorMessage';

const ErrorMessages = ({ messages = {}, allowableMessages = [] }) => (
  <div className={styles.messages}>
    { Object.keys(messages)
      .filter(key => allowableMessages.indexOf(key) > -1)
      .map(key => <ErrorMessage message={messages[key]} />) };
  </div>
);

export default ErrorMessages;

ErrorMessages.propTypes = {
  messages: PropTypes.shape({}),
  allowableMessages: PropTypes.arrayOf(PropTypes.string),
};
