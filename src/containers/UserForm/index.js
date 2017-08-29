import React from 'react'
import PropTypes from 'prop-types'

import { reduxForm, Field, getFormMeta, getFormSyncErrors, isInvalid } from 'redux-form'
import { connect } from 'react-redux'

import { TextField } from 'redux-form-material-ui'

import Button from '../../components/01-atoms/Button'
import ErrorMessages from '../../components/02-molecules/ErrorMessages'

import { userInviteStart } from '../../actions/index'

import { validate } from './validate'

import styles from './styles.scss'

const UserForm = ({
  handleSubmit,
  submitUser,
  errors,
  isFormTouched,
  invalid,
}) => {
  return (
    <div>
      <h2 className={styles.invite}>Invite a User</h2>
      <form onSubmit={handleSubmit(submitUser)}>
        <Field
          name="email"
          component={TextField}
          floatingLabelFixed
          floatingLabelText="E-mail"
        />

        <Button
          disabled={!isFormTouched || invalid}
          type="submit"
          content="Invite"
        />
      </form>

      { isFormTouched
        ? <ErrorMessages errors={errors} />
        : null }
    </div>
  )
}

UserForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitUser: PropTypes.func.isRequired,
  errors: PropTypes.shape({}),
  isFormTouched: PropTypes.bool.isRequired,
  invalid: PropTypes.bool.isRequired,
}

const mapStateToProps = state => ({
  errors: getFormSyncErrors('user-form')(state),
  isFormTouched: getFormMeta('user-form')(state) ? true : false,
  invalid: isInvalid('user-form')(state),
})

const mapDispatchToProps = dispatch => ({
  submitUser: user => dispatch(userInviteStart(user)),
})

export default connect(mapStateToProps, mapDispatchToProps)(
  reduxForm({ form: 'user-form', validate })(UserForm))
