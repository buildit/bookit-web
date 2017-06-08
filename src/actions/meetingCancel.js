import { createAction } from 'redux-actions'

import {
  CANCEL_MEETING_START,
  CANCEL_MEETING_SUCCEEDED,
  CANCEL_MEETING_FAILED,
} from './actionTypes'

export const cancelMeetingStart = createAction(CANCEL_MEETING_START, (meeting, room) => ({
  meeting,
  room,
}))

export const cancelMeetingSucceeded = createAction(CANCEL_MEETING_SUCCEEDED)

export const cancelMeetingFailed = createAction(CANCEL_MEETING_FAILED, message => ({
  message,
}))
