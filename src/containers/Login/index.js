import React, { PropTypes } from 'react';

import { reduxForm, Field } from 'redux-form';
import { TextField } from 'redux-form-material-ui';
import { CircularProgress, RaisedButton } from 'material-ui';

import { connect } from 'react-redux';

import styles from './styles.scss';

import { loginRequest } from '../../actions';

class Login extends React.Component {

  static propTypes = {
    handleSubmit: PropTypes.func,
    loginRequest: PropTypes.func,
    login: PropTypes.shape({
      requesting: PropTypes.bool,
      successful: PropTypes.bool,
      errors: PropTypes.array,
    }),
  }

  submit = (values) => {
    this.props.loginRequest(values);
  }

  render() {
    const {
      handleSubmit,
      login: {
        requesting,
        errors,
      },
    } = this.props;

    return (
      <div className={styles.login}>
        <form onSubmit={handleSubmit(this.submit)}>
          <h1>Bookit</h1>
          <div className="auth-messages">
            {!requesting && !!errors.length && (
              <div>{errors.toString()}</div>
            )}
            {requesting && (
              <CircularProgress size={60} thickness={7} />
            )}
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
            <RaisedButton label="Bookit" type="submit" style={{ marginTop: 12, marginBottom: 12 }} fullWidth />
          </div>
        </form>
      </div>
    );
  }

}

const mapStateToProps = state => ({
  login: state.login,
});

const connected = connect(mapStateToProps, { loginRequest })(Login);
const formed = reduxForm({ form: 'login' })(connected);

export default formed;

