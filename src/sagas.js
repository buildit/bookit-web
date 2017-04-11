import { cancel, cancelled, call, fork, put, take, takeEvery } from 'redux-saga/effects';
import { browserHistory } from 'react-router';
import { destroy } from 'redux-form';

import api from './api';

import {
  CLIENT_UNSET,
  LOGIN_REQUESTING,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  MEETINGS_RECEIVED,
  MEETINGS_FETCH_FAILED,
  START_MEETINGS_REQUEST,
  CREATE_MEETING_START,
  CREATE_MEETING_SUCCESS,
} from './actions/actionTypes';

import {
  setClient,
  unsetClient,
  createMeetingFailure,
  closeMeetingDialog,
} from './actions';

function loginApi(email, password) {
  if (password === 'password') {
    return {
      email: 'bruce@myews.onmicrosoft.com',
      name: 'Bruce',
      id: 12345,
      token: '12345abcde',
    };
  }
  throw new Error('You fail');
}

function* logout() {
  yield put(unsetClient());
  localStorage.removeItem('token');
  browserHistory.push('/login');
}

function* loginFlow(email, password) {
  let user;
  try {
    user = yield call(loginApi, email, password);
    yield put(setClient(user));
    yield put({ type: LOGIN_SUCCESS });
    localStorage.setItem('user', JSON.stringify(user));
    browserHistory.push('/dashboard');
  } catch (error) {
    yield put({ type: LOGIN_ERROR, error });
  } finally {
    if (yield cancelled()) {
      browserHistory.push('/login');
    }
  }
  return user;
}

function* loginWatcher() {
  while (true) {
    const { email, password } = yield take(LOGIN_REQUESTING);
    const task = yield fork(loginFlow, email, password);
    const action = yield take([CLIENT_UNSET, LOGIN_ERROR]);
    if (action.type === CLIENT_UNSET) yield cancel(task);
    yield call(logout);
  }
}

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

function* meetingsWatcher() {
  yield takeEvery(START_MEETINGS_REQUEST, fetchMeetings);
  yield takeEvery(CREATE_MEETING_START, createMeeting);
}

function* rootSaga() {
  yield [meetingsWatcher(), loginWatcher()];
}

export default rootSaga;
