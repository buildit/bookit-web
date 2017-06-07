import { call, put } from 'redux-saga/effects'

import { fetchMeetings } from './meetings'

import {
  selectDateSucceeded,
} from '../actions'

function* selectDate(action) {
  try {
    const start = action.payload.date.format('YYYY-MM-DD')
    yield call(fetchMeetings, { start })
    yield put(selectDateSucceeded(action.payload.date))
  } catch (err) {
    // Do nothing.  fetchDate is the only interaction here, and it has its own
    // error messaging.
  }
}

export default selectDate
