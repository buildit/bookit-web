import React from 'react'
import PropTypes from 'prop-types'

import Button from '../../01-atoms/Button/index'

import styles from './styles.scss'

const ConfirmationDialog = ({ message, onClickYes, onClickNo }) => (
  <div className={styles.confirmationDialog}>
    <p>{ message || 'Are you sure?' }</p>
    <div>
      <Button onClick={onClickYes} content="Yes" />
      <Button onClick={onClickNo} content="No" />
    </div>
  </div>
)

export default ConfirmationDialog

ConfirmationDialog.propTypes = {
  onClickYes: PropTypes.func.isRequired,
  onClickNo: PropTypes.func.isRequired,
  message: PropTypes.string,
}
