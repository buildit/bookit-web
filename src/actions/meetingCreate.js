import { createAction } from 'redux-actions'

import {
  MEETING_CREATE_START,
  MEETING_CREATE_SUCCEEDED,
  MEETING_CREATE_FAILED,
} from './actionTypes'

export const meetingCreateStart = createAction(MEETING_CREATE_START, (meeting, room, token) => ({
  meeting,
  room,
  token,
}))

export const meetingCreateSucceeded = createAction(MEETING_CREATE_SUCCEEDED)

export const meetingCreateFailed = createAction(MEETING_CREATE_FAILED, message => ({
  message,
}))
