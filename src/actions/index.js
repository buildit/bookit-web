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

export const logout = createAction(LOGOUT);

export const resetMeetings = createAction(RESET_MEETINGS);

export const populateMeetingEditForm = createAction(CREATE_MEETING_REQUEST, (room, meeting) => ({
  room,
  meeting,
}));

export const cancelMeetingRequest = createAction(CREATE_MEETING_CANCEL);

export const closeMeetingDialog = createAction(CLOSE_MEETING_DIALOG);

export const createMeetingStart = createAction(CREATE_MEETING_START, (meeting, room) => ({
  meeting,
  room,
}))

export const resetUser = createAction(RESET_USER);

export const fetchMeetingsFailure = createAction(MEETINGS_FETCH_FAILED, message => ({
  message,
}));

export const createMeetingFailure = createAction(CREATE_MEETING_FAILURE, message => ({
  message,
}))
