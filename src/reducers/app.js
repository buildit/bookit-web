import moment from 'moment';
import * as assert from 'assert';
import {
CREATE_MEETING_REQUEST,
CREATE_MEETING_CANCEL,
MEETINGS_RECEIVED,
CLOSE_MEETING_DIALOG,
CREATE_MEETING_FAILURE,
MEETINGS_FETCH_FAILED,
} from '../actions/actionTypes';

import getAvailableTimeSlot from '../utils/getAvailableTimeSlot';

// TODO: flatten!

const initialState = {
  messages: [],
  requestedMeeting: {},
  selectedDate: moment().startOf('day'),
  meetings: [],
  user: {
    email: 'bruce@myews.onmicrosoft.com',
    name: 'Bruce',
  },
  isEditingMeeting: false,
  meetingEditForm: {
    title: '',
    startTime: moment(),
    endTime: moment(),
  },
};

function mapMeetingData(meetings) {
  const mapMeeting = m => {
    const start = moment(m.start);
    const end = moment(m.end);
    return ({ ...m, start, end });
  };
  return meetings.map(rm => ({ room: rm.room, meetings: rm.meetings.map(mapMeeting) }));
}


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case MEETINGS_RECEIVED: {
      return { ...state, meetings: mapMeetingData(action.meetings) };
    }
    case CREATE_MEETING_REQUEST: {
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
    case CREATE_MEETING_CANCEL:
    case CLOSE_MEETING_DIALOG:
      return { ...state, isEditingMeeting: false, messages: [] };

    case CREATE_MEETING_FAILURE:
    case MEETINGS_FETCH_FAILED:
      return { ...state, messages: [action.payload.message] };

    default: {
      return state;
    }
  }
};

export default reducer;
