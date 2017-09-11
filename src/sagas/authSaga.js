import { all, call, put, select, take } from 'redux-saga/effects'

import history from '../history'

import * as constants from '../constants'
import * as actions from '../actionCreators'
import * as selectors from '../selectors'

import Api from '../api2'

export function* logout() {
  console.log('logout')

  yield take(constants.LOGOUT_REQUEST)

  yield all([
    call(Api.clearAuthentication),
    put(actions.clearAuth()),
    put(actions.clearUser()),
  ])

  yield call(history.replace, '/login')

  yield put(actions.logoutSuccess())
}

// TODO: This saga should also yield a call to a `verifyAuthenticationToken`
// saga, where we make sure the persisted token is actually a JWT and is not
// actually or going to be expired.
export function* getPersistedAuthenticationToken() {
  console.log('getPersistedAuthenticationToken')

  const authnToken = yield call(Api.getAuthentication)
  // const isValid = yield call(verifyAuthenticationToken, authnToken)
  // if (!isValid) {
  //   return null
  // }
  return authnToken
}

export function* persistAuthenticationToken(token) {
  console.log('persistAuthenticationToken')

  yield call(Api.storeAuthentication, token)
}

export function* setAuthenticated(token) {
  console.log('setAuthenticated')

  yield call(persistAuthenticationToken, token)
  yield put(actions.setAuthentication(token.accessToken))
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

  let authnToken = yield call(getPersistedAuthenticationToken)

  if (!authnToken) {
    authnToken = yield call(authenticate)
  }

  yield call(setAuthenticated, authnToken)

  yield call(authFlow)
}

export function* authFlow() {
  console.log('authFlow')

  yield call(history.replace, '/')  // DO NOT LIKE THIS AT ALL.

  const hasAuthenticationToken = yield select(selectors.hasAuthenticationToken)

  while (!hasAuthenticationToken) {
    yield call(resolveAuthentication)
  }

  if (hasAuthenticationToken) {
    yield call(authorize)
    yield put(actions.loginSuccess())

    yield call(history.replace, '/dashboard') // DO NOT LIKE THISSSSSSSSSS

    yield call(logout)
  }
}

export default authFlow
