import { call, put, select, take } from 'redux-saga/effects'

import * as constants from '../constants'
import * as actions from '../actionCreators'
import * as selectors from '../selectors'

import { normalizeRooms, normalizeMeetings } from '../schema'

// TODO: Try to avoid cross-contamination...
// The problem is that if we instead rely on `put` to signal authSaga
// that something needs to happen, then things just fall apart due to
// the fact that `put` is non-blocking, and in all our sagas we kinda
// implicitly rely on sequenced uses of `call`, which always blocks
import { authorize, validateToken } from './authSaga'

import Api from '../api2'

export function* getRooms() {
  try {
    const json = yield call(Api.fetchRooms)
    const normalized = yield call(normalizeRooms, json)
    yield put(actions.receiveRooms(normalized))
  } catch (error) {
    yield call(console.log, 'GETROOMS ERROR', error)
  }
}

export function* getRoomsIfNeeded() {
  const roomIds = yield select(selectors.getRoomIds)
  if (!roomIds.length) {
    yield call(getRooms)
  }
}

export function* getAuthorization() {
  let authzToken = yield select(selectors.getAuthorizationToken)

  const isValidAuthorizationToken = yield call(validateToken, authzToken)

  if (!isValidAuthorizationToken) {
    yield call(authorize)
    authzToken = yield select(selectors.getAuthorizationToken)
  }

  return authzToken
}

export function* getMeetings(date) {
  try {
    yield call(getRoomsIfNeeded)

    const token = yield call(getAuthorization)
    const json = yield call(Api.fetchMeetings, token, date)
    const normalized = yield call(normalizeMeetings, json)

    yield put(actions.receiveMeetings(normalized))
  } catch (error) {
    yield call(console.log, 'GETMEETINGS ERROR', error)
  }
}

export function* watchForFetches() {
  while (true) {  // eslint-disable-line
    const { payload } = yield take(constants.FETCH_MEETINGS)
    yield call(getMeetings, payload)
  }
}

export default watchForFetches

