import { loginFailure, meetingsFetchFailed } from './index';

describe('Login failure action creator', () => {
  const error = new Error('Oh no!');

  it('to create a properly formed action.', () => {
    expect(loginFailure(error)).toEqual({
      type: 'LOGIN_FAILURE',
      payload: error,
      error: true,
    });
  });

  it('to return an error message.', () => {
    const action = loginFailure(error);
    const errorMessage = action.payload.message;
    expect(errorMessage).toEqual('Oh no!');
  });
});

describe('Meeting fetch action creator', () => {
  const error = new Error('Oh no! Failed to fetch meetings.');

  it('to create a properly formed action.', () => {
    expect(meetingsFetchFailed(error)).toEqual({
      type: 'MEETINGS_FETCH_FAILED',
      payload: error,
      error: true,
    });
  });

  it('to return an error message.', () => {
    const action = meetingsFetchFailed(error);
    const errorMessage = action.payload.message;
    expect(errorMessage).toEqual('Oh no! Failed to fetch meetings.');
  });
});
