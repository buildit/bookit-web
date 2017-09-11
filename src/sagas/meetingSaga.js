import { call, put, select, take } from 'redux-saga/effects'

import * as constants from '../constants'
import * as actions from '../actionCreators'
import * as selectors from '../selectors'

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

export function* getMeetings(date) {
  console.log('getMeetings')
  try {
    yield call(getRooms)

    // TODO: Getting the authz token isn't enough... we need to get it
    // via a call, which will then verify if it's still valid - if not
    // we'll silently obtain a new authz token and carry on.
    const token = yield select(selectors.getAuthorizationToken)
    const json = yield call(Api.fetchMeetings, token, date)

    yield put(actions.receiveMeetings(json))
  } catch (error) {
    console.log('GETMEETINGS ERROR', error)
  }
}

export function* meetingSaga() {
  console.log('meetingSaga')
  while (true) {  // eslint-disable-line
    const { payload: date } = yield take(constants.FETCH_MEETINGS)
    yield call(getMeetings, date)
  }
}

export default meetingSaga

