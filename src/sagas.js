import { call, put, takeEvery } from 'redux-saga/effects';
import { destroy } from 'redux-form';
import api from './api';
import {
  MEETINGS_RECEIVED,
  MEETINGS_FETCH_FAILED,
  START_MEETINGS_REQUEST,
  CREATE_MEETING_START,
  CREATE_MEETING_SUCCESS,
  CREATE_MEETING_FAILURE,
 } from './actions/actionTypes';
import { closeMeetingDialog } from './actions';

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
    yield call(api.createMeeting, meeting);
    yield put(closeMeetingDialog());
    yield put(destroy('meeting-editor'));
    yield put({ type: CREATE_MEETING_SUCCESS });
  } catch (e) {
    yield put({ type: CREATE_MEETING_FAILURE });
  }
}

function* rootSaga() {
  yield takeEvery(START_MEETINGS_REQUEST, fetchMeetings);
  yield takeEvery(CREATE_MEETING_START, createMeeting);
}

export default rootSaga;
