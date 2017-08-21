import moment from 'moment'
import {
  INIT_MEETING_FORM,
  RESET_UI,
  POPULATE_MEETING_CREATE_FORM,
  POPULATE_MEETING_EDIT_FORM,
  CLOSE_CANCELLATION_DIALOG,
  CREATE_MEETING_CANCEL,
  MEETINGS_FETCH_SUCCEEDED,
  MEETINGS_FETCH_FAILED,
  CLOSE_MEETING_DIALOG,
  SELECT_DATE_SUCCEEDED,
  OPEN_CANCELLATION_DIALOG,
  CANCEL_MEETING_SUCCEEDED,
  CANCEL_MEETING_FAILED,
  OPEN_INVITE_USER_DIALOG,
  CLOSE_INVITE_USER_DIALOG,
  OPEN_REMOVE_USER_DIALOG,
  CLOSE_CONFIRMATION_DIALOG,
  USER_INVITE_SUCCEEDED,
  USER_INVITE_FAILED,
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
  userAction: '',
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
      userAction: 'cancelling',
    }
  }
  case CANCEL_MEETING_SUCCEEDED: {
    return {
      ...state,
      userAction: '',
      messages: ['Your meeting was successfully cancelled.'],
    }
  }
  case CANCEL_MEETING_FAILED: {
    return {
      ...state,
      userAction: '',
      messages: ['Oh no! There was a problem cancelling your meeting.'],
    }
  }
  case INIT_MEETING_FORM: {
    const isQuickMeeting = action.payload.type === 'quick'
    // const isCreatingMeeting = ['quick', 'full'].indexOf(action.payload.type) > -1
    return {
      ...state,
      userAction: isQuickMeeting ? 'quickBooking' : 'creating',
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
        userAction: 'creating',
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
      userAction: 'editing',
      requestedMeeting: meeting,
    }
  }
  case CLOSE_CANCELLATION_DIALOG:
  case CREATE_MEETING_CANCEL:
  case CLOSE_MEETING_DIALOG: {
    return {
      ...state,
      userAction: '',
      messages: [],
      requestedMeeting: {},
    }
  }
  case OPEN_INVITE_USER_DIALOG: {
    return {
      ...state,
      userAction: 'inviting',
    }
  }
  case CLOSE_INVITE_USER_DIALOG: {
    return {
      ...state,
      userAction: '',
    }
  }
  case OPEN_REMOVE_USER_DIALOG: {
    const userToBeRemoved = action.payload
    return {
      ...state,
      userAction: 'removing',
      userToBeRemoved,
    }
  }
  case CLOSE_CONFIRMATION_DIALOG: {
    return {
      ...state,
      userAction: '',
      userToBeRemoved: '',
    }
  }
  case USER_INVITE_SUCCEEDED: {
    return {
      ...state,
      messages: [`Success! ${action.payload.email} has been added.`],
    }
  }
  case USER_INVITE_FAILED: {
    const message = action.payload
    return {
      ...state,
      messages: [message],
    }
  }
  case USER_REMOVE_SUCCEEDED: {
    const userEmail = action.payload
    return {
      ...state,
      messages: [`Fare thee well, ${userEmail}!`],
    }
  }
  case USER_REMOVE_FAILED: {
    const message = action.payload
    return {
      ...state,
      messages: [message],
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
