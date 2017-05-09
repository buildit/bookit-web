import { takeEvery } from 'redux-saga/effects';
import { fetchMeetings, createMeeting } from './meetings';
import { login, logout } from './auth';

import {
  LOGIN_START,
  LOGOUT,
  MEETINGS_FETCH_START,
  MEETING_CREATE_START,
} from '../actions/actionTypes';

function* rootSaga() {
  yield takeEvery(MEETINGS_FETCH_START, fetchMeetings);
  yield takeEvery(MEETING_CREATE_START, createMeeting);
  yield takeEvery(LOGIN_START, login);
  yield takeEvery(LOGOUT, logout);
}

export default rootSaga;
