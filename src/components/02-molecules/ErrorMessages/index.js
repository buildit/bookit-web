import React from 'react'
import PropTypes from 'prop-types'

import styles from './styles.scss'
import ErrorMessage from '../../01-atoms/ErrorMessage'

const ErrorMessages = ({ messages = {}, allowableMessages = [] }) => (
  <div className={styles.messages}>
    { Object.keys(messages)
      .filter(key => allowableMessages.indexOf(key) > -1)
      .map(key => <ErrorMessage key={key} message={messages[key]} />) }
  </div>
)

export default ErrorMessages

ErrorMessages.propTypes = {
  messages: PropTypes.shape({}),
  allowableMessages: PropTypes.arrayOf(PropTypes.string),
}
