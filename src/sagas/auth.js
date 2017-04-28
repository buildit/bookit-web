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
  try {
    const user = yield call(api.login, action.payload.email, action.payload.password);
    yield put(setClient(user));
    yield put(resetMeetings());
    yield put(loginSuccess());
    if (localStorage) {
      localStorage.setItem('user', JSON.stringify(user));
    }
    browserHistory.push('/dashboard');
  } catch (error) {
    // TODO: Catch meaningful errors from above
    // and pass them to `loginFailure`
    yield put(loginFailure(new Error('Oops! Login failed. Please try again.')));
  }
}

export function* logout() {
  yield put(resetUser());
  if (localStorage) {
    localStorage.removeItem('user');
  }
  browserHistory.push('/login');
}
