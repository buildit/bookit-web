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

export const timelineMeetingRequested = () => ({
  type: 'USER_TIMELINE_MEETING_REQUESTED',
});

export const roomsRequested = () => ({
  type: 'ROOMS_REQUESTED',
});

export const roomsReceived = rooms => ({
  type: 'ROOMS_RECEIVED',
  rooms,
});
