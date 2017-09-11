import React, { PureComponent } from 'react'
import PropTypes from "prop-types"

const Iframe = class extends PureComponent {
  displayName: 'Iframe'

  render() {
    return React.createElement('iframe', {
      ref: this.props.iframeRef,
      // ref: iframe => this.$iframe = iframe,
      frameBorder: '0',
      src: this.props.url,
      target: '_parent',
      allowFullScreen: this.props.allowFullScreen || false,
      style: {
        ...{
          position: this.props.position || 'absolute',
          display: this.props.display || 'block',
          height: this.props.height || '100%',
          width: this.props.width || '100%',
        },
        ...(this.props.styles || {}),
      },
      height: this.props.height || '100%',
      width: this.props.width || '100%',
    })
  }
}

Iframe.propTypes = {
  url: PropTypes.string.isRequired,
  iframeRef: PropTypes.func,
  width: PropTypes.string,
  position: PropTypes.string,
  display: PropTypes.string,
  height: PropTypes.string,
  styles: PropTypes.object,
  allowFullScreen: PropTypes.bool,
}

export default Iframe
