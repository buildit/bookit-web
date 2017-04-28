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
  START_MEETINGS_REQUEST,
} from './actionTypes';

export const startMeetingsRequest = createAction(START_MEETINGS_REQUEST);

export const setClient = createAction(SET_USER);

export const loginRequest = createAction(LOGIN_REQUEST, user => ({
  email: user.email,
  password: user.password,
}));

export const loginSuccess = createAction(LOGIN_SUCCESS);

export const loginFailure = createAction(LOGIN_FAILURE);

// export const loginFailure = error => ({
//   type: LOGIN_FAILURE,
//   error,
// });

export const logout = () => ({ type: LOGOUT });

export const resetMeetings = () => ({ type: RESET_MEETINGS });

export const populateMeetingEditForm = (room, meeting) => ({
  type: CREATE_MEETING_REQUEST,
  payload: {
    room,
    meeting,
  },
});

export const cancelMeetingRequest = createAction(CREATE_MEETING_CANCEL);

export const closeMeetingDialog = createAction(CLOSE_MEETING_DIALOG);

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
