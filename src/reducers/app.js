import moment from 'moment';
import { CREATE_MEETING_REQUEST, CREATE_MEETING_CANCEL, MEETINGS_RECEIVED } from '../actions/actionTypes';

// TODO: flatten!

const initialState = {
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

const reducer = (state = initialState, action) => {
  switch (action.type) {
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
    case CREATE_MEETING_CANCEL: {
      return { ...state, isEditingMeeting: false };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
