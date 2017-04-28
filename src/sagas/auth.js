import 'regenerator-runtime/runtime';
import { call, put } from 'redux-saga/effects';
import { browserHistory } from 'react-router';

import api from '../api';

import {
  loginSuccess,
  loginFailure,
  setClient,
  resetMeetings,
  resetUser,
} from '../actions';

export function* login(action) {
  console.log(action);
  try {
    const user = yield call(api.login, action.email, action.password);
    yield put(setClient(user));
    yield put(resetMeetings());
    yield put(loginSuccess());
    localStorage.setItem('user', JSON.stringify(user));
    browserHistory.push('/dashboard');
  } catch (error) {
    yield put(loginFailure(error));
  }
}

export function* logout() {
  yield put(resetUser());
  yield call(localStorage.removeItem, 'user');
  yield call(browserHistory.push, '/login');
}
