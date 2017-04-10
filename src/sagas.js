import { cancel, cancelled, call, fork, put, take, takeEvery } from 'redux-saga/effects';
import { browserHistory } from 'react-router';
import api from './api';
import { CLIENT_UNSET, LOGIN_REQUESTING, LOGIN_SUCCESS, LOGIN_ERROR, MEETINGS_RECEIVED, MEETINGS_FETCH_FAILED, START_MEETINGS_REQUEST } from './actions/actionTypes';
import { setClient, unsetClient } from './actions';

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

function* meetingsWatcher() {
  yield takeEvery(START_MEETINGS_REQUEST, fetchMeetings);
}

function* rootSaga() {
  yield [meetingsWatcher(), loginWatcher()];
}

export default rootSaga;
