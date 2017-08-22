// import agent from 'superagent'

// import moment from 'moment'
import normalizeData from './schema'

export const FETCH_MEETINGS = 'FETCH_MEETINGS'

export const REQUEST_MEETINGS = 'REQUEST_MEETINGS'
export const RECEIVE_DATA = 'RECEIVE_DATA'

export const SELECT_DATE = 'SELECT_DATE'
export const INVALIDATE_DATE = 'INVALIDATE_DATE'

export const selectDate = date => ({
  type: SELECT_DATE,
  date,
})

export const invalidateDate = date => ({
  type: INVALIDATE_DATE,
  date,
})

export const requestMeetings = date => ({
  type: REQUEST_MEETINGS,
  date,
})

export const receiveData = data => ({
  type: RECEIVE_DATA,
  data: normalizeData(data),
})

// const fetchMeetings = date => (dispatch) => {
//   dispatch(requestMeetings(date))

//   const start = moment(date)
//   const end = moment(date).add(1, 'day')

//   return agent
//     .get(`http://localhost:8888/rooms/nyc/meetings?start=${start}&end=${end}`)
//     .then(response => response.json())
//     .then(json => dispatch(receiveMeetings(date, json)))
// }

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

export const fetchMeetingsIfNeeded = () => ({ type: FETCH_MEETINGS })
// export const fetchMeetingsIfNeeded = date => (dispatch, getState) => {
//   if (shouldFetchMeetings(getState(), date)) {
//     return dispatch(fetchMeetings(date))
//   }
// }
