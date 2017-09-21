import { all, call, put, select, take, race } from 'redux-saga/effects'

import history from '../history'

import * as constants from '../constants'
import * as actions from '../actionCreators'
import * as selectors from '../selectors'

import { decodeJWT } from '../utils/jwt-decode'
import { parseOauthFragment } from '../utils/parse-oauth-fragment'

import Api from '../api'

// authSaga needs to provide another saga for independently selecting
// and validating the authn token in the case where the authorize
// saga is being run.

// tokens reducers need independent cases for clearing a named token
// instead of just clearing all, so in the authorize saga we can call
// actions.clearAuthorization (idempotent) before the new call to get
// the validated authn token.

// This also allows for the silent refresh of authn scenario I've
// been avoiding.

export function* loadLocalAuthenticationIntoState() {
  const authnToken = yield call(Api.getAuthentication)
  yield put.resolve(actions.setAuthentication(authnToken))
}

export function* clearAllAuth() {
  yield all([
    call(Api.clearAuthentication),
    put(actions.clearAuth()),
  ])
}

export function* validateToken(token) {
  if (!token) {
    return [ false, constants.TOKEN_MISSING ]
  }
  const decoded = yield call(decodeJWT, token)
  if (!decoded) {
    return [ false, constants.TOKEN_BADLY_FORMED ]
  }
  const expires = new Date(decoded.exp * 1000)
  const hasExpired = new Date >= expires
  if (hasExpired) {
    return [ false, constants.TOKEN_EXPIRED ]
  }
  return [ true, constants.TOKEN_VALID ]
}

export function* setAuthenticationToken(token) {
  yield all([
    call(Api.storeAuthentication, token),
    put(actions.setAuthentication(token)),
  ])
}

export function* setAuthorizationToken(token, user) {
  yield all([
    put(actions.setAuthorization(token)),
    put(actions.setUser(user)),
  ])
}

export function* awaitLogout() {
  yield take(constants.LOGOUT_REQUEST)

  yield call(clearAllAuth)
  yield put(actions.logoutSuccess())

  // Restart the authorization flow
  yield call(authFlow)
}

// https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=9a8b8181-afb1-48f8-a839-a895d39f9db0&scope=openid%20profile%20offline_access%20https%3A%2F%2Fgraph.microsoft.com%2Fcalendars.read%20https%3A%2F%2Fgraph.microsoft.com%2Fcalendars.readwrite%20https%3A%2F%2Fgraph.microsoft.com%2Fuser.read&response_type=token&nonce=e2f965c6-5d1d-43d6-9bfa-0c74cb1e7b4f&redirect_uri=http%3A%2F%2Flocalhost%3A3001%2Fopenid-complete&response_mode=fragment&state=f34e21d5-ae12-4a79-864a-8ea814d466cb&prompt=bruce%40builditcontoso.onmicrosoft.com

export function* awaitAuthentication() {
  yield call(history.replace, '/login')

  const { payload } = yield take(constants.LOGIN_REQUEST)
  const authnToken = yield call(parseOauthFragment, payload, 'access_token')

  yield call(setAuthenticationToken, authnToken)

  return authnToken
}

export function* awaitAuthorization() {
  const authnToken = yield call(getAuthenticationToken)

  let authzToken

  try {
    const { token, ...user } = yield call(Api.authorize, authnToken)
    yield call(setAuthorizationToken, token, user)
    authzToken = token
  } catch (error) {
    yield call(console.log, 'authorize error:', error)
  }

  return authzToken
}

export function* getAuthenticationToken() {
  const authnToken = yield select(selectors.getAuthenticationToken)

  const [ isValid, tokenState ] = yield call(validateToken, authnToken)
  if (isValid) return authnToken

  let refreshedAuthnToken

  // Authentication tokens are capable of being silently refreshed,
  // but refreshing the token cannot happen with XHR - we have to use
  // an iframe and poll for the new token from the location hash
  if (tokenState === constants.TOKEN_EXPIRED) {
    yield put(actions.refreshAuthRequest())

    const { success, failure } =  yield race({
      success: take(constants.REFRESH_AUTH_SUCCESS),
      failure: take(constants.REFRESH_AUTH_FAILURE),
    })

    if (success) {
      refreshedAuthnToken = yield call(parseOauthFragment, success.payload, 'access_token')
      yield call(setAuthenticationToken, refreshedAuthnToken)
    } else {
      yield call(console.log, 'FAILED TO REFRESH:', failure.payload)
    }
  }

  return refreshedAuthnToken
}

export function* getAuthorizationToken() {
  let authzToken = yield select(selectors.getAuthorizationToken)

  const [ isValid/*, tokenState*/ ] = yield call(validateToken, authzToken)

  if (isValid) return authzToken

  // if authzToken is not valid, we can always "rescue" it as long
  // as we have a valid authnToken
  authzToken = yield call(awaitAuthorization)

  return authzToken
}

export function* authFlow() {
  let authnToken = yield call(getAuthenticationToken)

  while (!authnToken) {
    authnToken = yield call(awaitAuthentication)
  }

  yield put(actions.loginSuccess())
  yield call(history.replace, '/dashboard')
  yield call(awaitLogout)
}

export function* startAuthentication() {
  // Prime the authentication state with stored authn token
  yield call(loadLocalAuthenticationIntoState)

  // Send the user to home so we can decide what to do with them
  const location = yield select(selectors.getRouterLocation)

  if (location && (location.pathname !== constants.LOCATION_ROOT)) {
    yield call(history.replace, '/')
  }

  // Begin the full authentication flow
  yield call(authFlow)
}

export default startAuthentication
