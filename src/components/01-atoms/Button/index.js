import React, { PropTypes } from 'react';
import styles from './styles.scss';

const Button = ({ disabled = false, type, content = '', onClick }) => (
  <button
    className={styles.button}
    disabled={disabled}
    type={type}
    onClick={onClick}
  >{ content }</button>
);

Button.propTypes = {
  disabled: PropTypes.bool,
  type: PropTypes.oneOf(['submit']),
  onClick: PropTypes.func,
  content: PropTypes.string.isRequired,
};

export default Button;
