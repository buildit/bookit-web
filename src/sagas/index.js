import { takeEvery } from 'redux-saga/effects';
import { fetchMeetings, createMeeting } from './meetings';
import { login, logout } from './auth';

import {
  LOGIN_REQUEST,
  LOGOUT,
  START_MEETINGS_REQUEST,
  CREATE_MEETING_START,
} from '../actions/actionTypes';

function* rootSaga() {
  yield takeEvery(START_MEETINGS_REQUEST, fetchMeetings);
  yield takeEvery(CREATE_MEETING_START, createMeeting);
  yield takeEvery(LOGIN_REQUEST, login);
  yield takeEvery(LOGOUT, logout);
}

export default rootSaga;
