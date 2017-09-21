import { all, call, put, select, race, take } from 'redux-saga/effects'
import { cloneableGenerator } from 'redux-saga/utils'

import history from '../history'

import * as constants from '../constants'
import * as actions from '../actionCreators'
import * as selectors from '../selectors'

import { decodeJWT } from '../utils/jwt-decode'
import { parseOauthFragment } from '../utils/parse-oauth-fragment'

import Api from '../api'

import {
  loadLocalAuthenticationIntoState,
  clearAllAuth,
  validateToken,
  setAuthenticationToken,
  setAuthorizationToken,
  awaitLogout,
  awaitAuthentication,
  awaitAuthorization,
  getAuthenticationToken,
  getAuthorizationToken,
  authFlow,
  startAuthentication,
} from './authSaga'

import * as jwtMock from '../../__mocks__/jwtMock'

describe('authSaga', () => {

  describe('#loadLocalAuthenticationIntoState()', () => {
    it('calls `Api.getAuthentication` followed by putting `actions.setAuthentication`', () => {
      const saga = loadLocalAuthenticationIntoState()

      const authnToken = null

      expect(saga.next().value).toEqual(call(Api.getAuthentication))
      expect(saga.next(authnToken).value).toEqual(put.resolve(actions.setAuthentication(authnToken)))
      expect(saga.next().done).toBeTruthy()
    })
  })

  describe('#clearAllAuth()', () => {
    it('makes calls to clear auth-related redux state and localStorage', () => {
      const saga = clearAllAuth()

      const expected = all([
        call(Api.clearAuthentication),
        put(actions.clearAuth()),
      ])

      expect(saga.next().value).toEqual(expected)
      expect(saga.next().done).toBeTruthy()
    })
  })

  describe('#validateToken(token)', () => {
    it('returns false when token is falsy', () => {
      const saga = validateToken(null)
      const next = saga.next()

      expect(next.value).toEqual([ false, constants.TOKEN_MISSING ])
      expect(next.done).toBeTruthy()
    })

    it('returns false when token is made of garbage', () => {
      const garbage = 'a fish'
      const saga = validateToken(garbage)

      let next

      expect(saga.next().value).toEqual(call(decodeJWT, garbage))

      next = saga.next()

      expect(next.value).toEqual([ false, constants.TOKEN_BADLY_FORMED ])
      expect(next.done).toBeTruthy()
    })

    it('returns false when token has or is about to expire', () => {
      const expiredToken = jwtMock.makeExpiredToken()
      const decoded = decodeJWT(expiredToken)
      const saga = validateToken(expiredToken)

      let next

      expect(saga.next().value).toEqual(call(decodeJWT, expiredToken))

      next = saga.next(decoded)

      expect(next.value).toEqual([ false, constants.TOKEN_EXPIRED ])
      expect(next.done).toBeTruthy()
    })

    it('returns true when token is valid', () => {
      const validToken = jwtMock.makeValidToken()
      const decoded = decodeJWT(validToken)
      const saga = validateToken(validToken)

      let next

      expect(saga.next().value).toEqual(call(decodeJWT, validToken))

      next = saga.next(decoded)
      expect(next.value).toEqual([ true, constants.TOKEN_VALID ])
      expect(next.done).toBeTruthy()
    })
  })

  describe('#setAuthenticationToken(token)', () => {
    it('calls store-related actions and apis', () => {
      const token = 'foo'
      const saga = setAuthenticationToken(token)

      const expected = all([
        call(Api.storeAuthentication, token),
        put(actions.setAuthentication(token)),
      ])

      expect(saga.next().value).toEqual(expected)
      expect(saga.next().done).toBeTruthy()
    })
  })

  describe('#setAuthorizationToken(token, user)', () => {
    it('sets the authorization token and user into the redux store', () => {
      const token = 'foo'
      const user = 'someuser'
      const saga = setAuthorizationToken(token, user)

      const expected = all([
        put(actions.setAuthorization(token)),
        put(actions.setUser(user)),
      ])

      expect(saga.next().value).toEqual(expected)
      expect(saga.next().done).toBeTruthy()
    })
  })

  describe('#awaitLogout()', () => {
    it('completely logs out the user', () => {
      const saga = awaitLogout()

      expect(saga.next().value).toEqual(take(constants.LOGOUT_REQUEST))
      expect(saga.next().value).toEqual(call(clearAllAuth))
      expect(saga.next().value).toEqual(put(actions.logoutSuccess()))
      expect(saga.next().value).toEqual(call(authFlow))
      expect(saga.next().done).toBeTruthy()
    })

  })

  describe('#awaitAuthentication()', () => {
    it('waits for a request to start authentication', () => {
      const payload = 'payload'
      const authnToken = 'authnToken'
      const saga = awaitAuthentication()

      expect(saga.next().value).toEqual(call(history.replace, '/login'))
      expect(saga.next().value).toEqual(take(constants.LOGIN_REQUEST))
      expect(saga.next({ payload }).value).toEqual(call(parseOauthFragment, payload, 'access_token'))
      expect(saga.next(authnToken).value).toEqual(call(setAuthenticationToken, authnToken))

      const next = saga.next()
      expect(next.value).toEqual(authnToken)
      expect(next.done).toBeTruthy()
    })
  })

  describe('#awaitAuthorization()', () => {
    it('does a thing', () => {
      const authnToken = jwtMock.makeValidToken()
      const { token, ...user } = { email: 'test@test.com', name: 'Testy McTesterson', isAdmin: false, token: '123abc' }
      const error = {}
      const saga = cloneableGenerator(awaitAuthorization)()

      expect(saga.next().value).toEqual(call(getAuthenticationToken))
      expect(saga.next(authnToken).value).toEqual(call(Api.authorize, authnToken))

      const cloneSaga = saga.clone()

      expect(saga.next({ token, ...user }).value).toEqual(call(setAuthorizationToken, token, user))
      expect(saga.next().done).toBeTruthy()

      expect(cloneSaga.throw(error).value).toEqual(call(console.log, 'authorize error:', error))
      expect(cloneSaga.next().done).toBeTruthy()
    })
  })

  describe('#getAuthenticationToken()', () => {
    it('does a thing', () => {
      const authnToken = jwtMock.makeValidToken()
      const refreshedAuthnToken = jwtMock.makeValidToken()
      const saga = cloneableGenerator(getAuthenticationToken)()

      let next

      // const authnToken = yield select(selectors.getAuthenticationToken)
      expect(saga.next().value).toEqual(select(selectors.getAuthenticationToken))
      // const [ isValid, tokenState ] = yield call(validateToken, authnToken)
      expect(saga.next(authnToken).value).toEqual(call(validateToken, authnToken))

      next = saga.clone().next([ true, constants.TOKEN_VALID ])
      // if (isValid) return authnToken
      expect(next.value).toEqual(authnToken)
      expect(next.done).toBeTruthy()

      const sagaClone = saga.clone()

      expect(sagaClone.next([ false, constants.TOKEN_EXPIRED ]).value).toEqual(put(actions.refreshAuthRequest()))
      expect(sagaClone.next().value).toEqual(
        race({
          success: take(constants.REFRESH_AUTH_SUCCESS),
          failure: take(constants.REFRESH_AUTH_FAILURE),
        })
      )

      const successSaga = sagaClone.clone()
      const success = take(constants.REFRESH_AUTH_SUCCESS)

      expect(successSaga.next({ success }).value).toEqual(call(parseOauthFragment, success.payload, 'access_token'))
      expect(successSaga.next(refreshedAuthnToken).value).toEqual(call(setAuthenticationToken, refreshedAuthnToken))
      expect(successSaga.next().done).toBeTruthy()

      const failureSaga = sagaClone.clone()
      const failure = take(constants.REFRESH_AUTH_FAILURE)

      expect(failureSaga.next({ failure }).value).toEqual(call(console.log, 'FAILED TO REFRESH:', failure.payload))
      expect(failureSaga.next().done).toBeTruthy()
    })
  })

  describe('#getAuthorizationToken()', () => {
    it('does a thing', () => {
      const authzToken = jwtMock.makeValidToken()
      const saga = cloneableGenerator(getAuthorizationToken)()

      let next

      // let authzToken = yield select(selectors.getAuthorizationToken)
      expect(saga.next().value).toEqual(select(selectors.getAuthorizationToken))

      // const [ isValid/*, tokenState*/ ] = yield call(validateToken, authzToken)
      expect(saga.next(authzToken).value).toEqual(call(validateToken, authzToken))

      const failureSaga = saga.clone()

      expect(failureSaga.next([ false ]).value).toEqual(call(awaitAuthorization))
      expect(failureSaga.next().done).toBeTruthy()

      next = saga.next([ true ])

      expect(next.value).toEqual(authzToken)
      expect(next.done).toBeTruthy()
    })
  })

  describe('#authFlow()', () => {
    it('does a thing', () => {
      const saga = cloneableGenerator(authFlow)()

      expect(saga.next().value).toEqual(call(getAuthenticationToken))

      const failureSaga = saga.clone()

      // calling next on failureSaga after this point will yield the exact same call
      expect(failureSaga.next(null).value).toEqual(call(awaitAuthentication))

      expect(saga.next('authnToken').value).toEqual(put(actions.loginSuccess()))
      expect(saga.next().value).toEqual(call(history.replace, '/dashboard'))
      expect(saga.next().value).toEqual(call(awaitLogout))
      expect(saga.next().done).toBeTruthy()
    })
  })

  describe('#startAuthentication()', () => {
    it('does a thing', () => {
      const location = { pathname: '/figs' }
      const saga = cloneableGenerator(startAuthentication)()

      expect(saga.next().value).toEqual(call(loadLocalAuthenticationIntoState))
      expect(saga.next().value).toEqual(select(selectors.getRouterLocation))

      const cloneSaga = saga.clone()

      expect(cloneSaga.next(location).value).toEqual(call(history.replace, '/'))
      expect(cloneSaga.next().value).toEqual(call(authFlow))
      expect(cloneSaga.next().done).toBeTruthy()

      expect(saga.next().value).toEqual(call(authFlow))
      expect(saga.next().done).toBeTruthy()
    })
  })

})
