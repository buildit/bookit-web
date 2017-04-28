import { createAction } from 'redux-actions';

import {
  SET_USER,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  RESET_MEETINGS,
  CREATE_MEETING_REQUEST,
  CREATE_MEETING_CANCEL,
  CREATE_MEETING_START,
  CLOSE_MEETING_DIALOG,
  MEETINGS_FETCH_FAILED,
  CREATE_MEETING_FAILURE,
  RESET_USER,
} from './actionTypes';

export const startMeetingsRequest = () => ({ type: 'START_MEETINGS_REQUEST' });

export function setClient(user) {
  return {
    type: SET_USER,
    ...user,
  };
}

export function loginRequest({ email, password }) {
  return {
    type: LOGIN_REQUEST,
    email,
    password,
  };
}

export const loginSuccess = () => ({ type: LOGIN_SUCCESS });

export const loginFailure = error => ({
  type: LOGIN_FAILURE,
  error,
});

export const logout = () => ({ type: LOGOUT });

export const resetMeetings = () => ({ type: RESET_MEETINGS });

export const populateMeetingEditForm = (room, meeting) => ({
  type: CREATE_MEETING_REQUEST,
  payload: {
    room,
    meeting,
  },
});

// export const cancelMeetingRequest = () => ({
//   type: CREATE_MEETING_CANCEL,
// });

export const cancelMeetingRequest = createAction(CREATE_MEETING_CANCEL);

export const closeMeetingDialog = () => ({
  type: CLOSE_MEETING_DIALOG,
});

export const createMeetingStart = (meeting, room) => ({
  type: CREATE_MEETING_START,
  payload: {
    meeting,
    room,
  },
});

const handleFailure = (code, message) => ({
  type: code,
  payload: {
    message,
  },
});

export const fetchMeetingsFailure = (message) => handleFailure(MEETINGS_FETCH_FAILED, message);

export const createMeetingFailure = (message) => handleFailure(CREATE_MEETING_FAILURE, `Failed to create the meeting. ${message}`);

export const resetUser = () => ({ type: RESET_USER });

// export const resetUser = () => {
//   console.log('resetUser');
//   return { type: RESET_USER };
// };
