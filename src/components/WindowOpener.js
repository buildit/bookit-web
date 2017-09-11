import { Component } from 'react'
import PropTypes from 'prop-types'

const defaultWindowOptions = {
  toolbar: 'no',
  location: 'no',
  directories: 'no',
  status: 'no',
  menubar: 'no',
  scrollbars: 'yes',
  resizable: 'no',
  width: 500,
  height: 400,
  top: (o, w) => ((w.innerHeight - o.height) / 2) + w.screenY,
  left: (o, w) => ((w.innerWidth - o.width) / 2) + w.screenX,
}

const createOptions = (userOptions = {}) => {
  const options = { ...defaultWindowOptions, ...userOptions }
  const retVal = []
  for (const [key, value] of Object.entries(options)) {
    retVal.push(`${key}=${typeof value === 'function' ? value.call(this, options, window) : value}`)
  }
  return retVal.join(',')
}

/**
 * WindowOpener is a React Component that takes a URL and options
 * that are passed to the standard `window.open` function,
 * the final two options, `onLoaded` and `onUnloaded` give the
 * parent component the ability to tap into the actual window
 * that is opened by this component.
 *
 * The bulk of the magic of this component extends from the fact that
 * the life of the child window is tied to this component, meaning
 * if you have a WindowOpener component mounting and unmounting via
 * some kind of conditional, then the child window will be destroyed
 * cleanly whenever the component unmounts, and will be recreated
 * when it mounts again.
 *
 * This is useful for development with Hot Module Reloading, as a DOM
 * reload will most likely cause this component to remount cleanly.
 */
export default class WindowOpener extends Component {
  static propTypes = {
    url: PropTypes.string,
    options: PropTypes.object,
    onUnloaded: PropTypes.func,
    onLoaded: PropTypes.func,
  }

  static defaultProps = {
    url: 'about:blank',
    options: {},
  }

  constructor(props) {
    super(props)

    this.state = { owindow: null }

    this.handleWindowLoad = this.handleWindowLoad.bind(this)
    this.handleWindowUnload = this.handleWindowUnload.bind(this)
    this.handleWindowClose = this.handleWindowClose.bind(this)
  }

  componentDidMount() {
    const { owindow } = this.state
    if (!owindow) this.handleWindowLoad(owindow)
  }

  componentWillUnmount() {
    this.handleWindowClose()
  }

  handleWindowLoad(owindow) {
    const { url, options } = this.props

    owindow = window.open(url, 'window-open', createOptions(options))

    owindow.onbeforeunload = () => this.handleWindowUnload()
    window.addEventListener('unload', this.handleWindowClose)

    const loadHandler = () => this.props.onLoaded && this.props.onLoaded(owindow)

    owindow.onload = loadHandler
    owindow.document.readyState === 'complete' && loadHandler()

    this.setState({ owindow })
  }

  handleWindowUnload() {
    this.props.onUnloaded && this.props.onUnloaded(this.state.owindow)
  }

  handleWindowClose() {
    const { owindow } = this.state
    owindow && owindow.close()
    window.removeEventListener('unload', this.handleWindowClose)
  }

  render() {
    return null
  }
}
