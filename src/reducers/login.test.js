import {
  LOGIN_START,
  LOGIN_SUCCEEDED,
  LOGIN_FAILED,
} from '../actions/actionTypes'

const initialState = {
  requesting: false,
  successful: false,
  message: '',
}

import login from './login'

describe('login reducer', () => {

  it('start a login process', () => {
    const newState = login(initialState, { type: LOGIN_START })
    expect(newState.requesting).toBeTruthy()
    expect(newState.successful).toBeFalsy()
  })

  it('login sucess', () => {
    const newState = login(initialState, { type: LOGIN_SUCCEEDED })
    expect(newState.requesting).toBeFalsy()
    expect(newState.successful).toBeTruthy()
  })

  it('login failure', () => {
    const newState = login(initialState, { type: LOGIN_FAILED, payload: {message: 'XXX'}})
    expect(newState.requesting).toBeFalsy()
    expect(newState.successful).toBeFalsy()
    expect(newState.message).toContain('XXX')
  })
})
