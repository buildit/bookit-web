import { createAction } from 'redux-actions'

import normalizeData from './schema'

export const SET_USER = 'SET_USER'

export const SELECT_MEETING = 'SELECT_MEETING'
export const SELECT_DATE = 'SELECT_DATE'

export const REQUEST_MEETINGS = 'REQUEST_MEETINGS'
export const FETCH_MEETINGS = 'FETCH_MEETINGS'
export const RECEIVE_MEETINGS = 'RECEIVE_MEETINGS'

export const setUser = createAction(SET_USER)

export const selectMeeting = createAction(SELECT_MEETING)
export const selectDate = createAction(SELECT_DATE)

export const requestMeetings = createAction(REQUEST_MEETINGS)
export const fetchMeetings = createAction(FETCH_MEETINGS)
export const receiveMeetings = createAction(RECEIVE_MEETINGS, data => normalizeData(data))

// export const selectDate = date => ({ type: SELECT_DATE, date })
// export const requestMeetings = date => ({ type: REQUEST_MEETINGS, date })
// export const fetchMeetingsIfNeeded = () => ({ type: FETCH_MEETINGS })
// export const receiveData = data => ({type: RECEIVE_DATA, data: normalizeData(data) })

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

// export const fetchMeetingsIfNeeded = date => (dispatch, getState) => {
//   if (shouldFetchMeetings(getState(), date)) {
//     return dispatch(fetchMeetings(date))
//   }
// }
