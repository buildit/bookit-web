import { createAction } from 'redux-actions';

import {
  MEETINGS_FETCH_START,
  MEETINGS_FETCH_SUCCEEDED,
  MEETINGS_FETCH_FAILED,

  CREATE_MEETING_START,
  CREATE_MEETING_FAILURE,
  CREATE_MEETING_REQUEST,
  CREATE_MEETING_CANCEL,
  CLOSE_MEETING_DIALOG,
  RESET_MEETINGS,
} from './actionTypes';

// MEETINGS FETCH
export const meetingsFetchStart = createAction(MEETINGS_FETCH_START);
export const meetingsFetchSucceeded = createAction(MEETINGS_FETCH_SUCCEEDED);
export const meetingsFetchFailed = createAction(MEETINGS_FETCH_FAILED, message => ({
  message,
}));

// MEETING CREATE
export const createMeetingStart = createAction(CREATE_MEETING_START, (meeting, room) => ({
  meeting,
  room,
}));

export const createMeetingFailure = createAction(CREATE_MEETING_FAILURE, message => ({
  message,
}));

// TODO: Handle success case


// TODO: Maybe move this stuff elsewhere?
export const populateMeetingEditForm = createAction(CREATE_MEETING_REQUEST, (room, meeting) => ({
  room,
  meeting,
}));

export const cancelMeetingRequest = createAction(CREATE_MEETING_CANCEL);

export const closeMeetingDialog = createAction(CLOSE_MEETING_DIALOG);

export const resetMeetings = createAction(RESET_MEETINGS);
