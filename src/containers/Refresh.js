import React, { Component } from 'react'
// import PropTypes from 'prop-types'

// import { connect } from 'react-redux'

import Iframe from '../components/Iframe'

import { refreshRequestUrl } from '../api/azure'

// import { authorizeRequest } from '../actionCreators'

const iframeStyles = { visibility: 'hidden' }

// <Iframe url={refreshRequestUrl()} width="0" height="0" styles={iframeStyles} />

export class Refresh extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Iframe
        url={refreshRequestUrl('bruce@builditcontoso.onmicrosoft.com', 'organizations')}
        iframeRef={el => this.iframeRef = el}
        width="0"
        height="0"
        styles={iframeStyles}
      />
    )
  }
}

export default Refresh

// export default connect(null, { authorizeRequest })(Login)
