import { CREATE_MEETING_REQUEST, CREATE_MEETING_CANCEL } from './actionTypes';

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
