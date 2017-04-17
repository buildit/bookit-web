import { cancel, cancelled, call, fork, put, take, takeEvery } from 'redux-saga/effects';
import { browserHistory } from 'react-router';
import { destroy } from 'redux-form';

import api from './api';

import {
  LOGIN_REQUEST,
  MEETINGS_RECEIVED,
  MEETINGS_FETCH_FAILED,
  START_MEETINGS_REQUEST,
  CREATE_MEETING_START,
  CREATE_MEETING_SUCCESS,
} from './actions/actionTypes';

import {
  loginSuccess,
  loginFailure,
  setClient,
  resetMeetings,
  createMeetingFailure,
  closeMeetingDialog,
} from './actions';

function* logout() {
  // yield put(unsetClient());
  localStorage.removeItem('user');
  browserHistory.push('/login');
}

function* loginFlow(email, password) {
  let user;
  try {
    user = yield call(api.login, email, password);
    // user = api.login();
    yield put(setClient(user));
    yield put(resetMeetings());
    yield put(loginSuccess());
    localStorage.setItem('user', JSON.stringify(user));
    browserHistory.push('/dashboard');
  } catch (error) {
    console.log(error)
    yield put(loginFailure(error));
  } finally {
    if (yield cancelled()) {
      browserHistory.push('/login');
    }
  }
  return user;
}

function* loginWatcher() {
  while (true) {
    const { email, password } = yield take(LOGIN_REQUEST);
    const task = yield fork(loginFlow, email, password);
    // const action = yield take([CLIENT_UNSET, LOGIN_ERROR]);
    // if (action.type === CLIENT_UNSET) yield cancel(task);
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
