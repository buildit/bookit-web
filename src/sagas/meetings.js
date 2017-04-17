import { call, put } from 'redux-saga/effects';
import { destroy } from 'redux-form';

import api from '../api';

import {
  MEETINGS_RECEIVED,
  MEETINGS_FETCH_FAILED,
  CREATE_MEETING_SUCCESS,
} from '../actions/actionTypes';

import {
  createMeetingFailure,
  closeMeetingDialog,
} from '../actions';

export function* fetchMeetings() {
  try {
    const meetings = yield call(api.fetchMeetings);
    yield put({ type: MEETINGS_RECEIVED, meetings });
  } catch (e) {
    yield put({ type: MEETINGS_FETCH_FAILED });
  }
}

export function* createMeeting(action) {
  try {
    const meeting = action.payload.meeting;
    const room = action.payload.room;
    yield call(api.createMeeting, meeting, room);
    yield put(closeMeetingDialog());
    yield put(destroy('meeting-editor'));
    yield put({ type: CREATE_MEETING_SUCCESS });
    yield call(fetchMeetings);
  } catch (err) {
    yield put(createMeetingFailure(err.response && err.response.body && err.response.body.message));
  }
}
