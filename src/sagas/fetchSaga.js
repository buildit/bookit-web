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
import { getAuthorizationToken } from './authSaga'

import Api from '../api'

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

// TODO: If authz token is invalid, we know that attempts to refresh
// it failed, or the authn token was also unable to be refreshed and
// subsequently meant we could not obtain a refreshed authz token.
// So basically, even though getMeetings _will_ succeed, it will
// contain nothing in the response - so fuck it, we should just bomb
// out somehow.
export function* getMeetings(date) {
  try {
    yield call(getRoomsIfNeeded)

    const token = yield call(getAuthorizationToken)
    const json = yield call(Api.fetchMeetings, token, date)
    const normalized = yield call(normalizeMeetings, json)

    yield put(actions.receiveMeetings(normalized))
  } catch (error) {
    yield call(console.log, 'GETMEETINGS ERROR', error)
  }
}

export function* awaitFetchMeetings() {
  while (true) {  // eslint-disable-line
    const { payload } = yield take(constants.FETCH_MEETINGS)
    yield call(getMeetings, payload)
  }
}

export default awaitFetchMeetings

