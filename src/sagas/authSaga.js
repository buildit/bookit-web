import { all, call, put, select, take } from 'redux-saga/effects'

import history from '../history'

import * as constants from '../constants'
import * as actions from '../actionCreators'
import * as selectors from '../selectors'

import { decodeJWT } from '../utils/jwt-decode'

import Api from '../api2'

export function* logout() {
  console.log('logout')

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
  console.log('getPersistedAuthentication')

  const authnToken = yield call(Api.getAuthentication)
  const isValidAuthentication = yield call(validateAuthentication, authnToken)

  if (!isValidAuthentication) {
    yield call(clearAllAuth)
    return null
  }

  return authnToken
}

export function* validateToken(token) {
  console.log('validateToken')
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

export function* validateAuthentication(token) {
  console.log('validateAuthentication')
  return yield call(validateToken, token)
}

export function* persistAuthentication(token) {
  console.log('persistAuthentication')

  yield call(Api.storeAuthentication, token)
}

export function* setAuthenticated(token) {
  console.log('setAuthenticated')

  yield call(persistAuthentication, token)
  yield put(actions.setAuthentication(token))
}

export function* authenticate() {
  console.log('authenticate')

  yield call(history.replace, '/login')  // URGHHHHHHHHHHHHHH HATE SELF.

  const { payload } = yield take(constants.LOGIN_REQUEST)
  return payload
}

export function* authorize() {
  console.log('authorize')

  const authnToken = yield select(selectors.getAuthenticationToken)
  const { token, ...user } = yield call(Api.authorize, authnToken)

  yield all([
    put(actions.setAuthorization(token)),
    put(actions.setUser(user)),
  ])
}

export function* resolveAuthentication() {
  console.log('resolveAuthentication')

  let authnToken = yield call(getPersistedAuthentication)

  if (!authnToken) {
    authnToken = yield call(authenticate)
  }

  yield call(setAuthenticated, authnToken)

  yield call(authenticateAndAuthorize)
}

export function* authenticateAndAuthorize() {
  console.log('authenticateAndAuthorize')

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
