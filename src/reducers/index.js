import moment from 'moment';
import { CREATE_MEETING_REQUEST } from '../actions/actionTypes';


const initialState = {
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
    case 'MEETINGS_RECEIVED': {
      return { ...state, meetings: action.meetings };
    }
    case CREATE_MEETING_REQUEST: {
      const startTime = state.selectedDate.clone().add(action.payload.startTime, 'hours');
      const meeting = {
        title: '',
        owner: state.user.name,
        startTime,
        endTime: startTime.clone().add(1, 'hour'),
        room: action.payload.room,
      };
      return { ...state, isEditingMeeting: true, meetingEditForm: meeting };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
