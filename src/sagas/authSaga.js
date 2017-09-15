import { all, call, put, select, take } from 'redux-saga/effects'

import queryString from 'query-string'

import history from '../history'

import * as constants from '../constants'
import * as actions from '../actionCreators'
import * as selectors from '../selectors'

import { decodeJWT } from '../utils/jwt-decode'

import Api from '../api2'

export function* extractIdentityFromLocationHash(query) {
  const { access_token: accessToken } = queryString.parse(query)
  return yield accessToken
}

export function* logout() {
  yield take(constants.LOGOUT_REQUEST)
  yield call(clearAllAuth)
  yield put(actions.logoutSuccess())
  // Restart the authorization flow
  yield call(resolveAuthentication)
}

export function* clearAllAuth() {
  yield all([
    call(Api.clearAuthentication),
    put(actions.clearAuth()),
    put(actions.clearUser()),
  ])
}

export function* getPersistedAuthentication() {
  const authnToken = yield call(Api.getAuthentication)
  const isValidAuthenticationToken = yield call(validateToken, authnToken)

  if (!isValidAuthenticationToken) {
    yield call(clearAllAuth)
    return null
  }

  return authnToken
}

export function* validateToken(token) {
  if (!token) {
    console.log('NO TOKEN AT ALL')
    return false
  }
  const decoded = yield call(decodeJWT, token)
  if (!decoded) {
    console.log('TOKEN COULD NOT BE DECODED')
    return false
  }
  const expires = new Date(decoded.exp * 1000)
  const hasExpired = new Date >= expires
  if (hasExpired) {
    console.log('TOKEN HAS EXPIRED')
    return false
  }
  return true
}

export function* setAuthenticated(token) {
  yield call(Api.storeAuthentication, token)
  yield put(actions.setAuthentication(token))
}

export function* authenticate() {
  yield call(history.replace, '/login')  // URGHHHHHHHHHHHHHH HATE SELF.

  const { payload } = yield take(constants.LOGIN_REQUEST)
  const identity = yield call(extractIdentityFromLocationHash, payload)

  return identity
}

export function* authorize() {
  const authnToken = yield select(selectors.getAuthenticationToken)
  const { token, ...user } = yield call(Api.authorize, authnToken)

  yield all([
    put(actions.setAuthorization(token)),
    put(actions.setUser(user)),
  ])
}

export function* resolveAuthentication() {
  let authnToken = yield call(getPersistedAuthentication)

  if (!authnToken) {
    authnToken = yield call(authenticate)
  }

  yield call(setAuthenticated, authnToken)

  yield call(authenticateAndAuthorize)
}

export function* authenticateAndAuthorize() {
  // TODO: This is kinda janky and needs reviewing to see if it's
  // worth replacing location state purely for the sake of displaying
  // loading spinner/throbbers
  const location = yield select(selectors.getRouterLocation)

  if (location && (location.pathname !== constants.LOCATION_ROOT)) {
    yield call(history.replace, '/')
  }
  // End of dubious things I want to potentially get rid of

  const hasAuthenticationToken = yield select(selectors.hasAuthenticationToken)

  while (!hasAuthenticationToken) {
    yield call(resolveAuthentication)
  }

  if (hasAuthenticationToken) {
    // Note that we don't `put` actions.authorizeRequest, as that is
    // intended for use outside the auth flow
    yield call(authorize)
    yield put(actions.loginSuccess())

    yield call(history.replace, '/dashboard')

    yield call(logout)
  }
}

export default authenticateAndAuthorize
