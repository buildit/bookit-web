import React from 'react'
import PropTypes from 'prop-types'

// import history from '../../../history'

const isModifiedEvent = event => !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey)

class Link extends React.Component {
  static propTypes = {
    onClick: PropTypes.func,
    target: PropTypes.string,
    replace: PropTypes.bool,
    to: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
    ]).isRequired,
  };

  static defaultProps = {
    replace: false,
  };

  static contextTypes = {
    router: PropTypes.shape({
      history: PropTypes.shape({
        push: PropTypes.func.isRequired,
        replace: PropTypes.func.isRequired,
        createHref: PropTypes.func.isRequired,
      }).isRequired,
    }).isRequired,
  };

  handleClick = (event) => {
    if (this.props.onClick) {
      this.props.onClick(event)
    }

    if (
      !event.defaultPrevented &&
      event.button === 0 &&
      !this.props.target &&
      !isModifiedEvent(event)
    ) {
      event.preventDefault()

      const { history } = this.context.router
      const { replace, to } = this.props

      if (replace) {
        history.replace(to)
      } else {
        history.push(to)
      }
    }
  }

  render() {
    const { replace, to, ...props } = this.props  // eslint-disable-line no-unused-vars

    const href = this.context.router.history.createHref(
      typeof to === 'string' ? { pathName: to } : to
    )

    return <a {...props} onClick={this.handleClick} href={href} />
  }
}

export default Link
