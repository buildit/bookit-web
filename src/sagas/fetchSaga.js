import { call, put, select, take } from 'redux-saga/effects'

import * as constants from '../constants'
import * as actions from '../actionCreators'
import * as selectors from '../selectors'

// TODO: Try to avoid cross-contamination...
// The problem is that if we instead rely on `put` to signal authSaga
// that something needs to happen, then things just fall apart due to
// the fact that `put` is non-blocking, and in all our sagas we kinda
// implicitly rely on sequenced uses of `call`, which always blocks
import { authorize, validateToken } from './authSaga'

import Api from '../api2'

export function* fetchRooms() {
  console.log('fetchRooms')
  try {
    const json = yield call(Api.fetchRooms)
    yield put(actions.receiveRooms(json))
  } catch (error) {
    console.log('GETROOMS ERROR', error)
  }
}

export function* getRooms() {
  console.log('getRooms')
  const roomIds = yield select(selectors.getRoomIds)
  if (!roomIds.length) {
    yield call(fetchRooms)
  }
}

export function* getAuthorization() {
  console.log('getAuthorization')
  let authzToken = yield select(selectors.getAuthorizationToken)

  const isValidAuthorization = yield call(validateAuthorization, authzToken)

  if (!isValidAuthorization) {
    yield call(authorize)
    authzToken = yield select(selectors.getAuthorizationToken)
  }

  return authzToken
}

export function* validateAuthorization(token) {
  console.log('validateAuthorization')
  return yield call(validateToken, token)
}

export function* getMeetings(date) {
  console.log('getMeetings')
  try {
    yield call(getRooms)

    const token = yield call(getAuthorization)
    const json = yield call(Api.fetchMeetings, token, date)

    yield put(actions.receiveMeetings(json))
  } catch (error) {
    console.log('GETMEETINGS ERROR', error)
  }
}

export function* watchForFetches() {
  console.log('watchForFetches')
  while (true) {  // eslint-disable-line
    const { payload: date } = yield take(constants.FETCH_MEETINGS)
    yield call(getMeetings, date)
  }
}

export default watchForFetches

