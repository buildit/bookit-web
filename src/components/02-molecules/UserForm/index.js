import React from 'react'
import PropTypes from 'prop-types'

import { Field } from 'redux-form'
import { TextField } from 'redux-form-material-ui'
import Button from '../../01-atoms/Button/index'
import styles from './styles.scss'
// TODO: replace Cancel button with svg asset.
const images = require.context('../../../assets/images', true)

const UserForm = ({
  user,
  handleSubmit,
  handleCancel,
  invalid,
 }) => {
  const buttons = <Button disabled={invalid} type="submit" content="Invite" />

  const header = <div className={styles.invite}>Invite Users</div>

  return (
    <div className={styles.form}>
      <img src={images('./close-desktop.png')} className={styles.cancel} onClick={handleCancel} alt="X" />
      { header }
      <div className={styles.section}>Select a directory</div>
      {// Right now the only directory we can add users from is Wipro.
       // We may need to change this in the future
      }
      <div className={styles.teamSelector}>Wipro</div>
      <div className={styles.section}>Enter user information</div>
      <form
        onSubmit={(event) => {
          event.preventDefault()
          handleSubmit(user)
        }}
      >
        <Field floatingLabelFixed floatingLabelText="Name" name="name" component={TextField} />
        <Field floatingLabelFixed floatingLabelText="E-mail address" name="email" component={TextField} />
        { buttons }
      </form>
    </div>
  )
}

UserForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
  invalid: PropTypes.bool.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
  }),
}

export default UserForm
