import { call, put, select, take } from 'redux-saga/effects'

import agent from 'superagent'
import moment from 'moment'

import normalizeData from '../schema'

import {
  REQUEST_MEETINGS,
  FETCH_MEETINGS,
  RECEIVE_MEETINGS,
} from '../actions'

import { getSelectedDate } from '../selectors'


const agentFetchMeetings = (date) => {
  const end = moment(date).add(1, 'day').format('YYYY-MM-DD')

  return agent
    .get(`http://localhost:8888/rooms/nyc/meetings?start=${date}&end=${end}`)
    .then(response => normalizeData(response.body))
}

function* apiFetchMeetings(date) {
  yield put({ type: REQUEST_MEETINGS, date })
  return yield call(agentFetchMeetings, date)
  // return data
}

// const shouldFetchMeetings = (state, date) => {
//   const meetings = state.meetingsByDate[date]
//   if (!meetings) {
//     return true
//   }
//   if (meetings.isFetching) {
//     return false
//   }
//   return meetings.didInvalidate
// }

// export const fetchMeetingsIfNeeded = date => (dispatch, getState) => {
//   if (shouldFetchMeetings(getState(), date)) {
//     return dispatch(fetchMeetings(date))
//   }
// }

function* fetchMeetingsSaga() {
  while (true) {  // eslint-disable-line no-constant-condition
    yield take(FETCH_MEETINGS)
    try {
      const date = yield select(getSelectedDate)
      const { entities } = yield call(apiFetchMeetings, date)
      console.log('HELLO?', entities)
      yield put({ type: RECEIVE_MEETINGS, entities })
    } catch (error) {
      // Should probably do something in here
      console.log('PISS SHIT', error)
    }
  }
}

function* rootSaga() {
  yield call(fetchMeetingsSaga)
}

export default rootSaga
