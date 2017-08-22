import {
  SET_USER,
  RESET_USER,
} from '../actions/actionTypes'

const initialState = {
  email: null,
  name: null,
  id: null,
  token: null,
}

import user from './user'

describe('user reducer', () => {

  it('set a user', () => {
    const newState = user(initialState, { type: SET_USER , payload:
      {email:  '', name: '', id: '', token: ''}})
    expect(newState.email).not.toBeNull()
    expect(newState.name).not.toBeNull()
    expect(newState.id).not.toBeNull()
    expect(newState.token).not.toBeNull()
  })

  it('reset a user', () => {
    const newState = user(initialState, { type: RESET_USER })
    expect(newState.email).toBeNull()
    expect(newState.name).toBeNull()
    expect(newState.id).toBeNull()
    expect(newState.token).toBeNull()
  })
})
