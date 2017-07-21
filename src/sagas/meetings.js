import { call, put, select } from 'redux-saga/effects'
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

import { getUserToken } from '../selectors'

export function* fetchMeetings(action = {}) {
  try {
    const token = yield select(getUserToken)
    const start = action.start ? action.start : undefined
    const end = action.end ? action.end : undefined

    const meetings = yield call(api.fetchMeetings, token, start, end)

    yield put(meetingsFetchSucceeded(meetings))
  } catch (error) {
    yield put(meetingsFetchFailed(error))
  }
}

export function* createMeeting(action) {
  try {
    const token = yield select(getUserToken)
    const { payload: { meeting, room } } = action
    yield call(api.createMeeting, token, meeting, room)
    yield put(closeMeetingDialog())
    yield put(destroy('meeting-editor'))
    yield put(meetingCreateSucceeded())
    yield call(fetchMeetings)
  } catch (err) {
    yield put(meetingCreateFailed(err.toString()))
  }
}

export function* cancelMeeting(action) {
  try {
    const token = yield select(getUserToken)
    const meeting = action.payload.meeting
    yield call(api.cancelMeeting, token, meeting.id, meeting.roomId)
    yield put(cancelMeetingSucceeded())
    yield put(meetingsFetchStart())
  } catch (err) {
    yield put(cancelMeetingFailed())
  }
}
