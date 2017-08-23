import { USER_INVITE_SUCCEEDED,
  USER_REMOVE_SUCCEEDED,
  USERS_FETCH_SUCCEEDED }
  from '../actions/actionTypes'

import users from './users'

describe('users reducer', () => {

  it('invite me a users???', () => {
    const newState = users([], { type: USER_INVITE_SUCCEEDED , payload: 'Bob'})
    expect(newState[0]).toBe('Bob')
  })

  it('get rid of users', () => {
    const newState = users([], { type: USER_REMOVE_SUCCEEDED })
    expect(newState).toHaveLength(0)
  })

  it('get me a list of users', () => {
    const newState = users([], { type: USERS_FETCH_SUCCEEDED , payload: 'Bob, Larry, Dave'})
    expect(newState).toBe('Bob, Larry, Dave')
  })
})
