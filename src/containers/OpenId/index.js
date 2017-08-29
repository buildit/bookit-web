import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import queryString from 'query-string'

import { loginRequest } from '../../actions'
import styles from './styles.scss'

import history from '../../history'

const processQueryParams = params => queryString.parse(params)

export class OpenId extends React.Component {

  componentDidMount() {
    const params = processQueryParams(this.props.location.hash)
    const code = params.access_token
    if (code) {
      this.props.login(code)
    }
    else if (params.error) {
      console.log(params)
      // TODO: Figure out where this needs to be called.  Or if it's ever called.
      history.push('/bad')
    }
  }
  render() {
    return (
      <div className={styles.openid}>Finalizing login.  Please wait.</div>
    )
  }
}

OpenId.propTypes = {
  location: PropTypes.shape({
    hash: PropTypes.string,
  }).isRequired,
  login: PropTypes.func,
}

const mapDispatchToProps = dispatch => ({
  login: code => dispatch(loginRequest(code)),
})

export default connect(null, mapDispatchToProps)(OpenId)
