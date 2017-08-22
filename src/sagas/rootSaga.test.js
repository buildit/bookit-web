import { takeEvery } from 'redux-saga/effects'
import { fetchMeetings, upsertMeeting } from './meetings'
import { login, logout } from './auth'
import rootSaga from './rootSaga'

import {
  LOGIN_START,
  LOGOUT,
  MEETINGS_FETCH_START,
  MEETING_UPSERT_START,
} from '../actions/actionTypes'

describe('Root Saga', () => {
  const rootGenerator = rootSaga()

  const fetchCorrect = takeEvery(MEETINGS_FETCH_START, fetchMeetings)
  const upsertCorrect = takeEvery(MEETING_UPSERT_START, upsertMeeting)
  const loginCorrect = takeEvery(LOGIN_START, login)
  const logoutCorrect = takeEvery(LOGOUT, logout)

  it('watches', () => {
    expect(rootGenerator.next().value).toEqual(fetchCorrect)
    expect(rootGenerator.next().value).toEqual(upsertCorrect)
    expect(rootGenerator.next().value).toEqual(loginCorrect)
    expect(rootGenerator.next().value).toEqual(logoutCorrect)
  })
})
