import { loginFailure } from './index'

describe('Login failure action creator', () => {
  const error = new Error('Oh no!')

  it('to create a properly formed action.', () => {
    expect(loginFailure(error)).toEqual({
      type: 'LOGIN_FAILED',
      payload: error,
      error: true,
    })
  })

  it('to return an error message.', () => {
    const action = loginFailure(error)
    const errorMessage = action.payload.message
    expect(errorMessage).toEqual('Oh no!')
  })
})
