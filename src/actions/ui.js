import { createAction } from 'redux-actions';

import {
  CREATE_MEETING_REQUEST,
  CREATE_MEETING_CANCEL,
  CLOSE_MEETING_DIALOG,
  RESET_MEETINGS,
} from './actionTypes';

export const populateMeetingEditForm = createAction(CREATE_MEETING_REQUEST, (room, meeting) => ({
  room,
  meeting,
}));

export const cancelMeetingRequest = createAction(CREATE_MEETING_CANCEL);

export const closeMeetingDialog = createAction(CLOSE_MEETING_DIALOG);

export const resetMeetings = createAction(RESET_MEETINGS);
