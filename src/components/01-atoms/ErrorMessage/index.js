import React from 'react'
import PropTypes from 'prop-types'

import styles from './styles.scss'

const ErrorMessage = ({ message }) => (
  <div className={styles.message}>{ message }</div>
)

export default ErrorMessage

ErrorMessage.propTypes = {
  message: PropTypes.string,
}
