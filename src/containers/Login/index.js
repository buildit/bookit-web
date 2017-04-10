import React, { PropTypes } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';

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
      handleSubmit, // remember, Redux Form injects this into our props
      login: {
        requesting,
        successful,
        errors,
      },
    } = this.props;

    return (
      <div className="login">
        <form className="widget-form" onSubmit={handleSubmit(this.submit)}>
          <h1>LOGIN</h1>
          <label htmlFor="email">Email</label>
          {/*
            Our Redux Form Field components that bind email and password
            to our Redux state's form -> login piece of state.
          */}
          <Field
            name="email"
            type="text"
            id="email"
            className="email"
            component="input"
          />
          <label htmlFor="password">Password</label>
          <Field
            name="password"
            type="password"
            id="password"
            className="password"
            component="input"
          />
          <button action="submit">LOGIN</button>
        </form>
        <div className="auth-messages">
          {/* As in the signup, we're just using the message and error helpers */}
          {!requesting && !!errors.length && (
            <div>{errors} </div>
          )}
          {requesting && <div>Logging in...</div>}
          {!requesting && !successful && (
            <div>Need to Signup? Click Here »</div>
          )}
        </div>
      </div>
    );
  }

}

const mapStateToProps = state => ({
  login: state.login,
});

const connected = connect(mapStateToProps, { loginRequest })(Login);

const formed = reduxForm({
  form: 'login',
})(connected);

export default formed;
