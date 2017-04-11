import moment from 'moment';
import {
  CLIENT_SET,
  CLIENT_UNSET,
  CREATE_MEETING_REQUEST,
  CREATE_MEETING_CANCEL,
  MEETINGS_RECEIVED,
  CLOSE_MEETING_DIALOG,
  CREATE_MEETING_FAILURE,
  MEETINGS_FETCH_FAILED,
} from '../actions/actionTypes';

// TODO: flatten!

const initialState = {
  messages: [],
  requestedMeeting: {},
  selectedDate: moment().startOf('day'),
  meetings: [],
  isEditingMeeting: false,
  meetingEditForm: {
    title: '',
    startTime: moment(),
    endTime: moment(),
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CLIENT_SET: {
      return { ...state, meetings: [] };
    }
    case CLIENT_UNSET: {
      return { ...state, meetings: [] };
    }
    case MEETINGS_RECEIVED: {
      return { ...state, meetings: action.meetings };
    }
    case CREATE_MEETING_REQUEST: {
      const start = state.selectedDate.clone().add(action.payload.meeting, 'hours');
      const meeting = {
        title: '',
        start,
        end: start.clone().add(1, 'hour'),
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
