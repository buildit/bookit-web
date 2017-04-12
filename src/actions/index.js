import {
  CLIENT_SET,
  CLIENT_UNSET,
  LOGIN_REQUESTING,
  CREATE_MEETING_REQUEST,
  CREATE_MEETING_CANCEL,
  CREATE_MEETING_START,
  CLOSE_MEETING_DIALOG,
  MEETINGS_FETCH_FAILED,
  CREATE_MEETING_FAILURE,
} from './actionTypes';

export const startMeetingsRequest = () => ({ type: 'START_MEETINGS_REQUEST' });

export function setClient(user) {
  return {
    type: CLIENT_SET,
    ...user,
  };
}

export function unsetClient() {
  return {
    type: CLIENT_UNSET,
  };
}

export function loginRequest({ email, password }) {
  return {
    type: LOGIN_REQUESTING,
    email,
    password,
  };
}

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
