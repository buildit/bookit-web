import React from 'react'
import PropTypes from 'prop-types'

import { reduxForm, Field } from 'redux-form'
import { TextField } from 'redux-form-material-ui'
import { CircularProgress, RaisedButton } from 'material-ui'

import { connect } from 'react-redux'

import styles from './styles.scss'

import { loginRequest } from '../../actions'

class Login extends React.Component {

  static propTypes = {
    handleSubmit: PropTypes.func,
    loginRequest: PropTypes.func,
    login: PropTypes.shape({
      requesting: PropTypes.bool,
      successful: PropTypes.bool,
      message: PropTypes.string,
    }),
  }

  submit = ({ email, password }) => {
    this.props.loginRequest({ email, password })
  }

  render() {
    const {
      handleSubmit,
      login: {
        requesting,
        message,
      },
    } = this.props

    return (
      <div className={styles.login}>
        <form onSubmit={handleSubmit(this.submit)}>
          {requesting && (
            <div className={styles.spinner}>
              <CircularProgress size={60} thickness={7} />
            </div>
          )}
          <h1>Bookit</h1>
          <div className={styles.message}>
            <span>{message}</span>
          </div>
          <div>
            <Field
              name="email"
              type="text"
              id="email"
              className="email"
              floatingLabelText="email"
              hintText="me@email.com"
              component={TextField}
            />
          </div>
          <div>
            <Field
              name="password"
              type="password"
              id="password"
              className="password"
              floatingLabelText="password"
              component={TextField}
            />
          </div>
          <div style={{ marginTop: 30 }}>
            <RaisedButton label="Login" type="submit" style={{ marginTop: 12, marginBottom: 12 }} fullWidth />
          </div>
        </form>
      </div>
    )
  }

}

const mapStateToProps = state => ({
  login: state.login,
})

const connected = connect(mapStateToProps, { loginRequest })(Login)
const formed = reduxForm({ form: 'login' })(connected)

export default formed
