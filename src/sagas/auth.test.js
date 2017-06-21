import { call, put } from 'redux-saga/effects'

import api from '../api'

import {
  loginSuccess,
  loginFailure,
  setClient,
  resetUi,
  resetUser,
} from '../actions'

import {
  login,
  logout,
} from './auth'

describe('Auth Saga', () => {
  const code = 'xyzzy'
  const action = {
    payload: { code },
  }
  const user = {
    email: 'test@test.com',
    name: 'Testy McTesterson',
    id: 12345,
    token: 'test12345test',
  }

  it('yields the proper sequence for logins with a password', () => {
    const generator = login(action)

    expect(generator.next().value).toEqual(call(api.login, code))
    expect(generator.next(user).value).toEqual(put(setClient(user)))
    expect(generator.next().value).toEqual(put(resetUi()))
    expect(generator.next().value).toEqual(put(loginSuccess()))

    expect(generator.next().done).toBeTruthy()

    // expect(localStorage.getItem('user')).toEqual(JSON.stringify(user))
    // expect(browserHistory.push).toHaveBeenCalledWith('/dashboard')
  })

  it('returns the same error message for all errors', () => {
    const expectedErrorMessage = 'Oops! Login failed. Please try again.'

    const generator1 = login(action)
    generator1.next()
    expect(generator1.throw(new Error('Polly whumps')).value)
      .toEqual(put(loginFailure(new Error(expectedErrorMessage))))
    expect(generator1.next().done).toBeTruthy()

    const generator2 = login(action)
    generator2.next()
    expect(generator2.throw(new Error('Wally pumps')).value)
      .toEqual(put(loginFailure(new Error(expectedErrorMessage))))
    expect(generator2.next().done).toBeTruthy()
  })

  it('yields the proper sequence for logout', () => {
    const generator = logout()

    // Set up for test
    localStorage.setItem('user', 'some arbitrary user data')
    expect(localStorage.getItem('user')).toEqual('some arbitrary user data')

    // Test the saga itself
    expect(generator.next().value).toEqual(put(resetUser()))
    expect(generator.next().done).toBeTruthy()

    // Test that localStorage is empty after logging out
    // expect(localStorage.getItem('user')).toBeUndefined()
    // expect(browserHistory.push).toHaveBeenCalledWith('/login')
  })
})
