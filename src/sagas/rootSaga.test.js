import { takeEvery } from 'redux-saga/effects'
import { fetchMeetings, createMeeting } from './meetings'
import { login, logout } from './auth'
import rootSaga from './rootSaga'

import {
  LOGIN_START,
  LOGOUT,
  MEETINGS_FETCH_START,
  MEETING_CREATE_START,
} from '../actions/actionTypes'

describe('Root Saga', () => {
  const rootGenerator = rootSaga()

  const fetchCorrect = takeEvery(MEETINGS_FETCH_START, fetchMeetings)
  const createCorrect = takeEvery(MEETING_CREATE_START, createMeeting)
  const loginCorrect = takeEvery(LOGIN_START, login)
  const logoutCorrect = takeEvery(LOGOUT, logout)

  it('watches', () => {
    expect(rootGenerator.next().value).toEqual(fetchCorrect)
    expect(rootGenerator.next().value).toEqual(createCorrect)
    expect(rootGenerator.next().value).toEqual(loginCorrect)
    expect(rootGenerator.next().value).toEqual(logoutCorrect)
  })
})
