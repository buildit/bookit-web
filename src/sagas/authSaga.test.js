import { all, call, put, select, take } from 'redux-saga/effects'
import { cloneableGenerator } from 'redux-saga/utils'

import history from '../history'

import * as constants from '../constants'
import * as actions from '../actionCreators'
import * as selectors from '../selectors'

import { decodeJWT } from '../utils/jwt-decode'

import Api from '../api2'

import {
  extractIdentityFromLocationHash,
  logout,
  clearAllAuth,
  getPersistedAuthentication,
  validateToken,
  setAuthenticated,
  authenticate,
  authorize,
  resolveAuthentication,
  authenticateAndAuthorize,
} from './authSaga'

import * as jwtMock from '../../__mocks__/jwtMock'

describe('authSaga', () => {

  describe('#logout()', () => {
    it('performs logout event flow', () => {
      const generator = logout()

      expect(generator.next().value).toEqual(take(constants.LOGOUT_REQUEST))
      expect(generator.next().value).toEqual(call(clearAllAuth))
      expect(generator.next().value).toEqual(put(actions.logoutSuccess()))
      expect(generator.next().value).toEqual(call(resolveAuthentication))

      expect(generator.next().done).toBeTruthy()
    })
  })

  describe('#clearAllAuth()', () => {
    it('clears user, authentication and authorization state', () => {
      const generator = clearAllAuth()

      expect(generator.next().value).toEqual(
        all([
          call(Api.clearAuthentication),
          put(actions.clearAuth()),
          put(actions.clearUser()),
        ])
      )
    })
  })

  describe('#getPersistedAuthentication()', () => {
    it('gets an authn token, validates it and returns it', () => {
      const authnToken = jwtMock.makeValidToken()

      const generator = cloneableGenerator(getPersistedAuthentication)()

      expect(generator.next().value).toEqual(call(Api.getAuthentication))
      expect(generator.next(authnToken).value).toEqual(call(validateToken, authnToken))

      const generatorIsValidAuthenticationToken = generator.clone()

      expect(generator.next(true).done).toBeTruthy()

      expect(generatorIsValidAuthenticationToken.next(false).value).toEqual(call(clearAllAuth))
      expect(generatorIsValidAuthenticationToken.next().done).toBeTruthy()
    })
  })

  describe('#validateToken(token)', () => {
    it('returns false when token is falsy', () => {
      const generator = validateToken(null)
      const next = generator.next()

      expect(next.done).toBeTruthy()
      expect(next.value).toBeFalsy()
    })

    it('returns false when token is made of garbage', () => {
      const garbage = 'a fish'
      const generator = validateToken(garbage)

      let next

      next = generator.next()
      expect(next.value).toEqual(call(decodeJWT, garbage))

      next = generator.next()

      expect(next.done).toBeTruthy()
      expect(next.value).toBeFalsy()
    })

    it('returns false when token has or is about to expire', () => {
      const expiredToken = jwtMock.makeExpiredToken()
      const decoded = decodeJWT(expiredToken)

      const generator = validateToken(expiredToken)

      let next

      next = generator.next()
      expect(next.value).toEqual(call(decodeJWT, expiredToken))

      next = generator.next(decoded)
      expect(next.done).toBeTruthy()
      expect(next.value).toBeFalsy()
    })

    it('returns true when token is valid', () => {
      const validToken = jwtMock.makeValidToken()
      const decoded = decodeJWT(validToken)

      const generator = validateToken(validToken)

      let next

      next = generator.next()
      expect(next.value).toEqual(call(decodeJWT, validToken))

      next = generator.next(decoded)
      expect(next.done).toBeTruthy()
      expect(next.value).toBeTruthy()
    })
  })

  describe('#setAuthenticated(token)', () => {
    it('persists the authentication token and dispatches an action to add it to the redux store', () => {
      const token = jwtMock.makeValidToken()

      const generator = setAuthenticated(token)

      expect(generator.next().value).toEqual(call(Api.storeAuthentication, token))
      expect(generator.next().value).toEqual(put(actions.setAuthentication(token)))
      expect(generator.next().done).toBeTruthy()
    })
  })

  describe('#authenticate()', () => {
    it('replaces the current browser location with `/login` and waits for the next `LOGIN_REQUEST` action', () => {
      const generator = authenticate()
      const payload = 'payload'

      expect(generator.next().value).toEqual(call(history.replace, '/login'))
      expect(generator.next().value).toEqual(take(constants.LOGIN_REQUEST))
      expect(generator.next({ payload }).value).toEqual(call(extractIdentityFromLocationHash, payload))
      expect(generator.next().done).toBeTruthy()
    })
  })

  describe('#authorize()', () => {
    it('selects the authn token from the redux store and uses it to call `Api.authorize` and finally it sets the authz token and user object extracted from the response into the redux store', () => {
      const authnToken = jwtMock.makeValidToken()
      const { token, ...user } = { email: 'test@test.com', name: 'Testy McTesterson', isAdmin: false, token: '123abc' }

      const generator = authorize()

      expect(generator.next().value).toEqual(select(selectors.getAuthenticationToken))
      expect(generator.next(authnToken).value).toEqual(call(Api.authorize, authnToken))
      expect(generator.next({ token, ...user }).value).toEqual(all([
        put(actions.setAuthorization(token)),
        put(actions.setUser(user)),
      ]))
    })
  })

  describe('#resolveAuthentication()', () => {
    const data = {}

    data.generator = cloneableGenerator(resolveAuthentication)()

    it('obtains a valid authn token preferably from persisted storage, otherwise waits for the user to login', () => {
      const generator = cloneableGenerator(resolveAuthentication)()

      expect(generator.next().value).toEqual(call(getPersistedAuthentication))

      const generatorHasAuthnToken = generator.clone()

      expect(generator.next(false).value).toEqual(call(authenticate))
      // CODE SMELL - This saga _works_, but the pattern used smells
      // like hell

      expect(generatorHasAuthnToken.next(true).value).toEqual(call(setAuthenticated, true))
      expect(generatorHasAuthnToken.next().value).toEqual(call(authenticateAndAuthorize))
      expect(generatorHasAuthnToken.next().done).toBeTruthy()
    })
  })

  describe('#authenticateAndAuthorize()', () => {
    it('handles all aspects of transparently rehydrating a previously logged in user', () => {
      const generator = cloneableGenerator(authenticateAndAuthorize)()

      expect(generator.next().value).toEqual(select(selectors.getRouterLocation))

      const generatorLocationNotRoot = generator.clone()
      expect(generatorLocationNotRoot.next({ pathname: '/testing' }).value).toEqual(call(history.replace, '/'))

      expect(generator.next({ pathname: '/' }).value).toEqual(select(selectors.hasAuthenticationToken))

      const generatorNotHasAuthenticationToken = generator.clone()
      expect(generatorNotHasAuthenticationToken.next(false).value).toEqual(call(resolveAuthentication))

      expect(generator.next(true).value).toEqual(call(authorize))
      expect(generator.next().value).toEqual(put(actions.loginSuccess()))
      expect(generator.next().value).toEqual(call(history.replace, '/dashboard'))
      expect(generator.next().value).toEqual(call(logout))

      expect(generator.next().done).toBeTruthy()
    })
  })

})
