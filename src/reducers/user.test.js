import {
  SET_USER,
  RESET_USER,
} from '../actions/actionTypes'

const initialState = {
  email: null,
  name: null,
  token: null,
  isAdmin: false,
}

import user from './user'

describe('user reducer', () => {

  it('set a user', () => {
    const newUser = {
      email: 'boo@foo.com',
      name: 'Boo Foo',
      token: 'blurg',
      isAdmin: false,
    }
    const action = {
      type: SET_USER,
      payload: newUser,
    }
    const newState = user(initialState, action)

    expect(newState).toEqual(newUser)
  })

  it('reset a user', () => {
    const newState = user(initialState, { type: RESET_USER })
    expect(newState).toEqual(initialState)
  })
})
