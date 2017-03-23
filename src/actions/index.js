export const updateMessage = () => ({
  type: 'UPDATE_MESSAGE',
});

export const userFetchRequested = userId => ({
  type: 'USER_FETCH_REQUESTED',
  userId,
});

export const userFetchSucceeded = user => ({
  type: 'USER_FETCH_SUCCEEDED',
  user,
});
