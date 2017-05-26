import moment from 'moment';
import {
  RESET_UI,
  POPULATE_MEETING_CREATE_FORM,
  POPULATE_MEETING_EDIT_FORM,
  CLOSE_CANCELLATION_DIALOG,
  CREATE_MEETING_CANCEL,
  MEETINGS_FETCH_SUCCEEDED,
  MEETINGS_FETCH_FAILED,
  CLOSE_MEETING_DIALOG,
  MEETING_CREATE_FAILED,
  SELECT_DATE_SUCCEEDED,
  OPEN_CANCELLATION_DIALOG,
  CANCEL_MEETING_SUCCEEDED,
  CANCEL_MEETING_FAILED,
} from '../actions/actionTypes';

import getAvailableTimeSlot from '../utils/getAvailableTimeSlot';

// TODO: flatten!

const initialState = {
  messages: [],
  requestedMeeting: {},
  selectedDate: moment().startOf('day'),
  meetings: [],
  isCreatingMeeting: false,
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
    case RESET_UI: {
      return { ...state, meetings: [], messages: [] };
    }
    case MEETINGS_FETCH_SUCCEEDED: {
      return { ...state, meetings: mapMeetingRoomMeetings(action.payload) };
    }
    case OPEN_CANCELLATION_DIALOG: {
      return {
        ...state,
        isEditingMeeting: false,
        isCancellingMeeting: true,
      };
    }
    case CANCEL_MEETING_SUCCEEDED: {
      return {
        ...state,
        isCancellingMeeting: false,
        messages: ['Your meeting was successfully cancelled.'],
      };
    }
    case CANCEL_MEETING_FAILED: {
      return {
        ...state,
        isCancellingMeeting: false,
        messages: ['Oh no! There was a problem cancelling your meeting.'],
      };
    }
    case POPULATE_MEETING_CREATE_FORM: {
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
      return { ...state, isCreatingMeeting: true, requestedMeeting: meeting };
    }
    case POPULATE_MEETING_EDIT_FORM: {
      const meeting = {
        title: action.payload.meeting.title,
        start: moment(action.payload.meeting.start),
        end: moment(action.payload.meeting.end),
        room: action.payload.meeting.room,
        id: action.payload.meeting.id,
      };
      return { ...state, isEditingMeeting: true, requestedMeeting: meeting };
    }
    case CLOSE_CANCELLATION_DIALOG:
    case CREATE_MEETING_CANCEL:
    case CLOSE_MEETING_DIALOG:
      return {
        ...state,
        isCreatingMeeting: false,
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
    case SELECT_DATE_SUCCEEDED: {
      return { ...state, selectedDate: action.payload.date };
    }
    default: {
      return state;
    }
  }
};

export default app;
