import { createAction } from 'redux-actions';

import {
  POPULATE_MEETING_FORM,
  CREATE_MEETING_CANCEL,
  CLOSE_MEETING_DIALOG,
  RESET_MEETINGS,
  SELECT_DATE,
} from './actionTypes';

export const populateMeetingForm = createAction(POPULATE_MEETING_FORM, (room, meeting) => ({
  room,
  meeting,
}));

export const cancelMeetingRequest = createAction(CREATE_MEETING_CANCEL);

export const closeMeetingDialog = createAction(CLOSE_MEETING_DIALOG);

export const resetMeetings = createAction(RESET_MEETINGS);

export const selectDate = createAction(SELECT_DATE, date => ({ date }));
