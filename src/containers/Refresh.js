import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'

import { createPropsSelector } from 'reselect-immutable-helpers'

import Iframe from '../components/Iframe'

import Api from '../api'

import { refreshAuthSuccess } from '../actionCreators'
import { getUserEmail } from '../selectors'

const iframeStyles = { visibility: 'hidden' }

// <Iframe url={refreshRequestUrl()} width="0" height="0" styles={iframeStyles} />

export class Refresh extends Component {
  static propTypes = {
    userEmail: PropTypes.string,
    refreshAuthSuccess: PropTypes.func,
  }

  constructor(props) {
    super(props)
    console.log('WHOOP WHOOP DATS THU SOUND OF THU POLICE!')

    this.handleIframeLoad = this.handleIframeLoad.bind(this)
    this.pollIframeLocation = this.pollIframeLocation.bind(this)

    this.poller = setInterval(this.pollIframeLocation, 1)
  }

  handleIframeLoad() {
    const refreshIframe = this.iframeRef

    const loadHandler = () => {
      if (this.poller) clearInterval(this.poller)
      this.poller = setInterval(this.pollIframeLocation, 1)
    }

    refreshIframe.contentWindow.onload = () => loadHandler()
    refreshIframe.contentDocument.readyState === 'complete' && loadHandler()
  }

  pollIframeLocation() {
    const refreshIframe = this.iframeRef
    const { refreshAuthSuccess } = this.props

    // if (!refreshIframe || refreshIframe.closed || refreshIframe.closed === undefined) this.handleWindowUnloaded()

    try {
      const iwindow = refreshIframe.contentWindow

      if (iwindow.location.href.indexOf(Api.authenticationRedirectUrl()) != -1) {
        clearInterval(this.poller)
        refreshAuthSuccess(iwindow.location.hash)
      }
    } catch (error) {}  // eslint-disable-line
  }

  componentDidMount() {
    if (this.iframeRef && this.iframeRef.contentWindow) {
      this.handleIframeLoad()
    }
  }

  componentWillUnmount() {
    if (this.poller) clearInterval(this.poller)
  }

  render() {
    return (
      <Iframe
        url={Api.refreshRequestUrl(this.props.userEmail)}
        iframeRef={el => this.iframeRef = el}
        width="0"
        height="0"
        styles={iframeStyles}
      />
    )
  }
}

// export default Refresh

const mapStateToProps = createPropsSelector({
  userEmail: getUserEmail,
})

export default connect(mapStateToProps, { refreshAuthSuccess })(Refresh)
