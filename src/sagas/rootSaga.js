import { call, put, select, take } from 'redux-saga/effects'

import agent from 'superagent'
import moment from 'moment'

import {
  REQUEST_MEETINGS,
  FETCH_MEETINGS,
  receiveData,
} from '../actions'

import { getSelectedDate } from '../selectors'


const agentFetchData = (date) => {
  const end = moment(date).add(1, 'day').format('YYYY-MM-DD')

  return agent
    .get(`http://localhost:8888/rooms/nyc/meetings?start=${date}&end=${end}`)
    .then(response => response.body)
}

function* apiFetchData(date) {
  yield put({ type: REQUEST_MEETINGS, date })
  return yield call(agentFetchData, date)
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

function* fetchDataSaga() {
  while (true) {  // eslint-disable-line no-constant-condition
    yield take(FETCH_MEETINGS)
    try {
      const date = yield select(getSelectedDate)
      const data = yield call(apiFetchData, date)
      yield put(receiveData(data))
    } catch (error) {
      // Should probably do something in here
      console.log('PISS SHIT', error)
    }
  }
}

function* rootSaga() {
  yield call(fetchDataSaga)
}

export default rootSaga
