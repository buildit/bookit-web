import { meetingsFetchFailed } from './index'

describe('Meeting fetch action creator', () => {
  const error = new Error('Oh no! Failed to fetch meetings.')

  it('to create a properly formed action.', () => {
    expect(meetingsFetchFailed(error)).toEqual({
      type: 'MEETINGS_FETCH_FAILED',
      payload: error,
      error: true,
    })
  })

  it('to return an error message.', () => {
    const action = meetingsFetchFailed(error)
    const errorMessage = action.payload.message
    expect(errorMessage).toEqual('Oh no! Failed to fetch meetings.')
  })
})
