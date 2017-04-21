import { call, takeEvery } from 'redux-saga/effects';
import { fetchMeetings, createMeeting } from './meetings';
import { login, logout } from './auth';

import {
  LOGIN_REQUEST,
  LOGOUT,
  START_MEETINGS_REQUEST,
  CREATE_MEETING_START,
} from '../actions/actionTypes';

function* rootSaga() {
  yield call(takeEvery, START_MEETINGS_REQUEST, fetchMeetings);
  yield call(takeEvery, CREATE_MEETING_START, createMeeting);
  yield call(takeEvery, LOGIN_REQUEST, login);
  yield call(takeEvery, LOGOUT, logout);
}

export default rootSaga;
