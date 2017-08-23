import moment from 'moment'
import {
  RESET_UI,
  ABORT_UI_ACTION,
  INIT_MEETING_FORM,
  POPULATE_MEETING_CREATE_FORM,
  POPULATE_MEETING_EDIT_FORM,
  MEETINGS_FETCH_SUCCEEDED,
  MEETINGS_FETCH_FAILED,
  SELECT_DATE_SUCCEEDED,
  OPEN_CANCELLATION_DIALOG,
  CANCEL_MEETING_SUCCEEDED,
  CANCEL_MEETING_FAILED,
  OPEN_INVITE_USER_DIALOG,
  USER_INVITE_SUCCEEDED,
  USER_INVITE_FAILED,
  OPEN_REMOVE_USER_DIALOG,
  USER_REMOVE_SUCCEEDED,
  USER_REMOVE_FAILED,
} from '../actions/actionTypes'

import getAvailableTimeSlot from '../utils/getAvailableTimeSlot'

// TODO: flatten!

const initialState = {
  messages: [],
  requestedMeeting: {},
  selectedDate: moment().startOf('day'),
  meetingsById: {},
  allMeetingIds: [],
  roomsById: {},
  allRoomIds: [],
  uiAction: '',
  userToBeRemoved: '',
  inviteUserForm: {
    email: '',
  },
}

const app = (state = initialState, action) => {
  switch (action.type) {
  case RESET_UI: {
    return { ...state, meetings: [], messages: [] }
  }
  case MEETINGS_FETCH_SUCCEEDED: {
    return {
      ...state,
      meetingsById: action.payload.meetingsById,
      allMeetingIds: action.payload.allMeetingIds,
      roomsById: action.payload.roomsById,
      allRoomIds: action.payload.allRoomIds,
    }
  }
  case OPEN_CANCELLATION_DIALOG: {
    return {
      ...state,
      uiAction: 'cancelling',
    }
  }
  case CANCEL_MEETING_SUCCEEDED: {
    return {
      ...state,
      uiAction: '',
      messages: ['Your meeting was successfully cancelled.'],
    }
  }
  case CANCEL_MEETING_FAILED: {
    return {
      ...state,
      uiAction: '',
      messages: ['Oh no! There was a problem cancelling your meeting.'],
    }
  }
  case INIT_MEETING_FORM: {
    // TODO: Both POPULATE_MEETING_CREATE_FORM and POPULATE_MEETING_EDIT_FORM
    // can be removed in favour of this action with the appropriate type
    // set.
    //
    // const isQuickMeeting = action.payload.type === 'quickBooking'
    // const isCreatingMeeting = action.payload.type === 'creating'
    // const isEditingMeeting = action.payload.type === 'editing'
    return {
      ...state,
      uiAction: action.payload.type,
    }
  }
  case POPULATE_MEETING_CREATE_FORM: {
    const now = moment()
    const startTime = state.selectedDate.clone().add(action.payload.meeting, 'hours')
    const meetingCreationIsAllowed = startTime.isAfter(now)

    if (meetingCreationIsAllowed) {
      const meetings = state.allMeetingIds
        .map(id => state.meetingsById[id])
        .filter(meeting => meeting.roomId === action.payload.room.email)

      const roundedDate = startTime.minutes(Math.floor(state.selectedDate.minutes() / 30) * 30)
      const validatedSlot = getAvailableTimeSlot(roundedDate, meetings)

      const meeting = {
        title: undefined,
        start: validatedSlot.start,
        end: validatedSlot.end,
        room: action.payload.room,
      }
      return {
        ...state,
        uiAction: 'creating',
        requestedMeeting: meeting,
      }
    }
    return state
  }
  case POPULATE_MEETING_EDIT_FORM: {
    const meeting = {
      id: action.payload.meeting.id,
      title: action.payload.meeting.title,
      start: moment(action.payload.meeting.start),
      end: moment(action.payload.meeting.end),
      room: {
        email: action.payload.meeting.roomId,
        name: action.payload.meeting.roomName,
      },
    }
    return {
      ...state,
      uiAction: 'editing',
      requestedMeeting: meeting,
    }
  }
  case ABORT_UI_ACTION: {
    return {
      ...state,
      uiAction: '',
      messages: [],
      requestedMeeting: {},
      userToBeRemoved: '',
    }
  }
  case OPEN_INVITE_USER_DIALOG: {
    return {
      ...state,
      uiAction: 'inviting',
    }
  }
  case OPEN_REMOVE_USER_DIALOG: {
    const userToBeRemoved = action.payload
    return {
      ...state,
      uiAction: 'removing',
      userToBeRemoved,
    }
  }
  case USER_INVITE_SUCCEEDED: {
    return {
      ...state,
      messages: [`Success! ${action.payload.email} has been added.`],
    }
  }
  case USER_INVITE_FAILED: {
    return {
      ...state,
      messages: [`${action.payload}`],
    }
  }
  case USER_REMOVE_SUCCEEDED: {
    return {
      ...state,
      messages: [`Fare thee well, ${action.payload}!`],
    }
  }
  case USER_REMOVE_FAILED: {
    return {
      ...state,
      messages: [`${action.payload}`],
    }
  }
  case MEETINGS_FETCH_FAILED: {
    return { ...state, messages: ['There was a problem fetching the meetings.'] }
  }
  case SELECT_DATE_SUCCEEDED: {
    return { ...state, selectedDate: action.payload.date }
  }
  default: {
    return state
  }
  }
}

export default app
