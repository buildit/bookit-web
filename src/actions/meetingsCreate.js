import { createAction } from 'redux-actions';

import {
  CREATE_MEETING_START,
  CREATE_MEETING_FAILURE,
} from './actionTypes';

// MEETING CREATE
export const createMeetingStart = createAction(CREATE_MEETING_START, (meeting, room) => ({
  meeting,
  room,
}));

export const createMeetingFailure = createAction(CREATE_MEETING_FAILURE, message => ({
  message,
}));

// TODO: Handle success case
