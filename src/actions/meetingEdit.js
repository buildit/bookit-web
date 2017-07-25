import { createAction } from 'redux-actions'

import {
  MEETING_EDIT_START,
  MEETING_EDIT_SUCCEEDED,
  MEETING_EDIT_FAILED,
} from './actionTypes'

export const meetingEditStart = createAction(MEETING_EDIT_START, (meeting, room, token) => ({
  meeting,
  room,
  token,
}))

export const meetingEditSucceeded = createAction(MEETING_EDIT_SUCCEEDED)

export const meetingEditFailed = createAction(MEETING_EDIT_FAILED, message => ({
  message,
}))
