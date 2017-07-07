import React from 'react'

import styles from './styles.scss'

import Api from '../../api'

class Login extends React.Component {
  render() {
    setTimeout(() => { window.location = Api.getOpenIdUrl() }, 750)
    return (
      <div className={styles.login}>
        <span className={styles.message}>Redirecting you to Azure login...</span>
      </div>
    )
  }
}

export default Login
