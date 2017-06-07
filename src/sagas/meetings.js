import { call, put } from 'redux-saga/effects'
import { destroy } from 'redux-form'

import api from '../api'

import {
  meetingsFetchSucceeded,
  meetingsFetchFailed,
  meetingCreateFailed,
  closeMeetingDialog,
  meetingCreateSucceeded,
  cancelMeetingSucceeded,
  cancelMeetingFailed,
  meetingsFetchStart,
} from '../actions'

export function* fetchMeetings(action = {}) {
  try {
    const start = action.start ? action.start : undefined
    const end = action.end ? action.end : undefined
    const meetings = yield call(api.fetchMeetings, start, end)
    yield put(meetingsFetchSucceeded(meetings))
  } catch (error) {
    yield put(meetingsFetchFailed(error))
  }
}

export function* createMeeting(action) {
  try {
    const { payload: { meeting, room, token } } = action
    yield call(api.createMeeting, meeting, room, token)
    yield put(closeMeetingDialog())
    yield put(destroy('meeting-editor'))
    yield put(meetingCreateSucceeded())
    yield call(fetchMeetings)
  } catch (err) {
    yield put(meetingCreateFailed(err.response && err.response.body && err.response.body.message))
  }
}

export function* cancelMeeting(action) {
  try {
    const meeting = action.payload.meeting
    yield call(api.cancelMeeting, meeting.id, meeting.roomId)
    yield put(cancelMeetingSucceeded())
    yield put(meetingsFetchStart())
  } catch (err) {
    yield put(cancelMeetingFailed())
  }
}
