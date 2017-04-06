import { CREATE_MEETING_REQUEST } from './actionTypes';

export const startMeetingsRequest = () => ({ type: 'START_MEETINGS_REQUEST' });

export const populateMeetingEditForm = (room, meeting) => ({
  type: CREATE_MEETING_REQUEST,
  payload: {
    room,
    meeting,
  },
});
