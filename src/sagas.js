import { call, put, takeEvery } from 'redux-saga/effects';
import { destroy } from 'redux-form';
import api from './api';
import {
  CREATE_MEETING_START,
  CREATE_MEETING_SUCCESS,
  MEETINGS_FETCH_FAILED,
  MEETINGS_RECEIVED,
  START_MEETINGS_REQUEST,
} from './actions/actionTypes';
import { createMeetingFailure, closeMeetingDialog } from './actions';

function* fetchMeetings() {
  try {
    const meetings = yield call(api.fetchMeetings);
    yield put({ type: MEETINGS_RECEIVED, meetings });
  } catch (e) {
    yield put({ type: MEETINGS_FETCH_FAILED });
  }
}

function* createMeeting(action) {
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

function* rootSaga() {
  yield takeEvery(START_MEETINGS_REQUEST, fetchMeetings);
  yield takeEvery(CREATE_MEETING_START, createMeeting);
}

export default rootSaga;
