import React from 'react'
import PropTypes from 'prop-types'

import styles from './styles.scss'

const Button = ({ disabled = false, type = 'button', content = '', onClick }) => (
  <button
    className={styles.button}
    style={disabled ? { color: 'gray', borderColor: 'gray' } : {}}
    disabled={disabled}
    type={type}
    onClick={onClick}
  >{ content }</button>
)

Button.propTypes = {
  disabled: PropTypes.bool,
  type: PropTypes.oneOf(['submit', 'button']),
  onClick: PropTypes.func,
  content: PropTypes.string.isRequired,
}

export default Button
