import { call, put, takeEvery } from 'redux-saga/effects'

import agent from 'superagent'
import moment from 'moment'

import {
  FETCH_MEETINGS,
  receiveMeetings,
} from '../actions'

const Api = {
  fetchMeetings: (date) => {
    const end = moment(date).add(1, 'day').format('YYYY-MM-DD')

    return agent
      .get(`http://localhost:8888/rooms/nyc/meetings?start=${date}&end=${end}`)
      .then(response => response.body)
  },
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

function* fetchMeetingsSaga(action) {
  const { payload: date } = action

  try {
    const json = yield call(Api.fetchMeetings, date)
    yield put(receiveMeetings(json))
  } catch (error) {
    // Should probably do something in here
    console.log('PISS SHIT', error)
  }
}

function* rootSaga() {
  yield takeEvery(FETCH_MEETINGS, fetchMeetingsSaga)
}

export default rootSaga
