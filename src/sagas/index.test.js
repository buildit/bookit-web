import 'jsdom-global/register';
import 'regenerator-runtime/runtime';

import { call, takeEvery } from 'redux-saga/effects';
import { fetchMeetings, createMeeting } from './meetings';
import { login, logout } from './auth';
import rootSaga from './index';

import {
  LOGIN_REQUEST,
  LOGOUT,
  START_MEETINGS_REQUEST,
  CREATE_MEETING_START,
} from '../actions/actionTypes';

describe('Root Saga', () => {
  const rootGenerator = rootSaga();

  const fetchCorrect = call(takeEvery, START_MEETINGS_REQUEST, fetchMeetings);
  const createCorrect = call(takeEvery, CREATE_MEETING_START, createMeeting);
  const loginCorrect = call(takeEvery, LOGIN_REQUEST, login);
  const logoutCorrect = call(takeEvery, LOGOUT, logout);

  it('watches', () => {
    expect(rootGenerator.next().value).toEqual(fetchCorrect);
    expect(rootGenerator.next().value).toEqual(createCorrect);
    expect(rootGenerator.next().value).toEqual(loginCorrect);
    expect(rootGenerator.next().value).toEqual(logoutCorrect);
  });
});
