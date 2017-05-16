import moment from 'moment';
import {
  RESET_MEETINGS,
  POPULATE_MEETING_FORM,
  CANCEL_MEETING_START,
  CANCEL_MEETING_CANCEL,
  CREATE_MEETING_CANCEL,
  MEETINGS_FETCH_SUCCEEDED,
  CLOSE_MEETING_DIALOG,
  MEETING_CREATE_FAILED,
  MEETINGS_FETCH_FAILED,
  SELECT_DATE,
} from '../actions/actionTypes';

import getAvailableTimeSlot from '../utils/getAvailableTimeSlot';

// TODO: flatten!

const initialState = {
  messages: [],
  requestedMeeting: {},
  selectedDate: moment().startOf('day'),
  meetings: [],
  isEditingMeeting: false,
  isCancellingMeeting: false,
  meetingEditForm: {
    title: '',
    startTime: moment(),
    endTime: moment(),
  },
};

const mapMeeting = m => {
  const start = moment(m.start);
  const end = moment(m.end);
  return ({ ...m, start, end });
};

const mapMeetingRoomMeetings = roomMeetings => roomMeetings.map(roomMeeting => (
  { room: roomMeeting.room,
    meetings: roomMeeting.meetings ? roomMeeting.meetings.map(mapMeeting) : [],
  }));

const app = (state = initialState, action) => {
  switch (action.type) {
    case RESET_MEETINGS: {
      return { ...state, meetings: [] };
    }
    case MEETINGS_FETCH_SUCCEEDED: {
      return { ...state, meetings: mapMeetingRoomMeetings(action.payload) };
    }
    case CANCEL_MEETING_START: {
      return {
        ...state,
        isEditingMeeting: false,
        isCancellingMeeting: true,
        requestedMeeting: action.payload.meeting,
      };
    }
    case POPULATE_MEETING_FORM: {
      const meetings = state.meetings
        .find(rm => rm.room.email === action.payload.room.email).meetings;
      const moment2 = state.selectedDate.clone().add(action.payload.meeting, 'hours');
      const roundedDate = moment2.minutes(Math.floor(state.selectedDate.minutes() / 30) * 30);
      const validatedSlot = getAvailableTimeSlot(roundedDate, meetings);

      const meeting = {
        title: '',
        start: validatedSlot.start,
        end: validatedSlot.end,
        room: action.payload.room,
      };
      return { ...state, isEditingMeeting: true, requestedMeeting: meeting };
    }
    case CANCEL_MEETING_CANCEL:
    case CREATE_MEETING_CANCEL:
    case CLOSE_MEETING_DIALOG:
      return {
        ...state,
        isEditingMeeting: false,
        isCancellingMeeting: false,
        messages: [],
        requestedMeeting: {},
      };
    case MEETING_CREATE_FAILED: {
      return { ...state, messages: [action.payload.message] };
    }
    case MEETINGS_FETCH_FAILED: {
      return { ...state, messages: ['There was a problem fetching the meetings.'] };
    }
    case SELECT_DATE: {
      return { ...state, selectedDate: action.payload.date };
    }
    default: {
      return state;
    }
  }
};

export default app;
