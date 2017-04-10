import {
  CREATE_MEETING_REQUEST,
  CREATE_MEETING_CANCEL,
  CREATE_MEETING_START,
  CLOSE_MEETING_DIALOG,
 } from './actionTypes';

export const startMeetingsRequest = () => ({ type: 'START_MEETINGS_REQUEST' });

export const populateMeetingEditForm = (room, meeting) => ({
  type: CREATE_MEETING_REQUEST,
  payload: {
    room,
    meeting,
  },
});

export const cancelMeetingRequest = () => ({
  type: CREATE_MEETING_CANCEL,
});

export const closeMeetingDialog = () => ({
  type: CLOSE_MEETING_DIALOG,
});

export const createMeetingStart = (meeting) => ({
  type: CREATE_MEETING_START,
  payload: {
    meeting,
  },
});
