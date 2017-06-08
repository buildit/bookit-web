import React from 'react'
import PropTypes from 'prop-types'

import styles from './styles.scss'

const Messages = ({ messages = [] }) => (
  <div className={styles.messages}>
    {messages.map((message, idx) => (
      <div key={idx} className={styles.message}>{message}</div>
    ))}
  </div>
)

Messages.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.string),
}

export default Messages
