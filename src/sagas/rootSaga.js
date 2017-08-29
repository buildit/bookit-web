import { takeEvery } from 'redux-saga/effects'
import { fetchMeetings, upsertMeeting, cancelMeeting } from './meetings'
import { login, logout } from './auth'
import selectDate from './selectDate'
import { userInvite, userRemove, fetchUsers } from './users'

import {
  LOGIN_START,
  LOGOUT,
  MEETINGS_FETCH_START,
  MEETING_UPSERT_START,
  CANCEL_MEETING_START,
  SELECT_DATE,
  USER_INVITE_START,
  USER_REMOVE_START,
  USERS_FETCH_START,
} from '../actions/actionTypes'

function* rootSaga() {
  yield takeEvery(MEETINGS_FETCH_START, fetchMeetings)
  yield takeEvery(MEETING_UPSERT_START, upsertMeeting)
  yield takeEvery(LOGIN_START, login)
  yield takeEvery(LOGOUT, logout)
  yield takeEvery(CANCEL_MEETING_START, cancelMeeting)
  yield takeEvery(SELECT_DATE, selectDate)
  yield takeEvery(USER_INVITE_START, userInvite)
  yield takeEvery(USER_REMOVE_START, userRemove)
  yield takeEvery(USERS_FETCH_START, fetchUsers)
}

export default rootSaga
