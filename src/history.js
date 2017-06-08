import createMemoryHistory from 'history/createMemoryHistory'
import createBrowserHistory from 'history/createBrowserHistory'

const createHistory = process.env.NODE_ENV === 'test' ?
  createMemoryHistory : createBrowserHistory

/**
 * Create a global reference to browserHistory to allow hooking up
 * react-router middleware and router.
 *
 * We have to do this because the redux store setup needs to be made
 * aware of whichever history implementation we want to use, but said
 * setup only uses `history` as a reference - once setup is done we
 * cannot pluck it back out, and since the react-router-redux
 * `ConnectedRouter` requires the same `history` from the redux
 * store middleware passed as a prop, this is the safest way to do it.
 *
 * Not exactly the cleanest solution, but this is more or less simply
 * boilerplate for application setup.
 *
 * If we are using react-router-redux correctly, then all history
 * functions (push, go, back, etc) are in fact actionCreators that
 * simply dispatch via normal redux flow.
 *
 * In the future this module could contain a switch on config or env
 * to import either `createBrowserHistory` or `createHashHistory` and
 * simply export the relevant history.
 */
export default createHistory()
