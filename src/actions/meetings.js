import { createAction } from 'redux-actions';

import {
  CREATE_MEETING_START,
  START_MEETINGS_REQUEST,
  MEETINGS_FETCH_FAILED,
  CREATE_MEETING_FAILURE,
  CREATE_MEETING_REQUEST,
  CREATE_MEETING_CANCEL,
  CLOSE_MEETING_DIALOG,
  RESET_MEETINGS,
} from './actionTypes';

export const startMeetingsRequest = createAction(START_MEETINGS_REQUEST);

export const createMeetingStart = createAction(CREATE_MEETING_START, (meeting, room) => ({
  meeting,
  room,
}));

export const fetchMeetingsFailure = createAction(MEETINGS_FETCH_FAILED, message => ({
  message,
}));

export const createMeetingFailure = createAction(CREATE_MEETING_FAILURE, message => ({
  message,
}));

export const populateMeetingEditForm = createAction(CREATE_MEETING_REQUEST, (room, meeting) => ({
  room,
  meeting,
}));

export const cancelMeetingRequest = createAction(CREATE_MEETING_CANCEL);

export const closeMeetingDialog = createAction(CLOSE_MEETING_DIALOG);

export const resetMeetings = createAction(RESET_MEETINGS);
