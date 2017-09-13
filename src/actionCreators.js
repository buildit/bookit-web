import { createAction } from 'redux-actions'

import queryString from 'query-string'

import { normalizeRooms, normalizeMeetings } from './schema'

import * as constants from './constants'

const extractIdentityFromLocationHash = (hash) => {
  const { access_token: accessToken } = queryString.parse(hash)
  return accessToken
}

export const setAuthentication = createAction(constants.SET_AUTHENTICATION)
export const setAuthorization = createAction(constants.SET_AUTHORIZATION)
export const clearAuth = createAction(constants.CLEAR_AUTH)

export const setUser = createAction(constants.SET_USER)
export const clearUser = createAction(constants.CLEAR_USER)

export const loginRequest = createAction(constants.LOGIN_REQUEST, data => extractIdentityFromLocationHash(data))
export const loginSuccess = createAction(constants.LOGIN_SUCCESS)
// export const loginError = createAction(constants.LOGIN_ERROR)

export const logoutRequest = createAction(constants.LOGOUT_REQUEST)
export const logoutSuccess = createAction(constants.LOGOUT_SUCCESS)
// export const logoutError = createAction(constants.LOGOUT_ERROR)

// EVERYTHING BELOW IS MOSTLY SUSPECT

export const authorizeRequest = createAction(constants.AUTHORIZE_REQUEST)
export const authorizeSuccess = createAction(constants.AUTHORIZE_SUCCESS)
export const authorizeError = createAction(constants.AUTHORIZE_ERROR)


export const selectDate = createAction(constants.SELECT_DATE)
export const incrementDate = createAction(constants.INCREMENT_DATE)
export const decrementDate = createAction(constants.DECREMENT_DATE)

export const fetchRooms = createAction(constants.FETCH_ROOMS)
export const receiveRooms = createAction(constants.RECEIVE_ROOMS, data => normalizeRooms(data))

export const fetchMeetings = createAction(constants.FETCH_MEETINGS)
export const receiveMeetings = createAction(constants.RECEIVE_MEETINGS, data => normalizeMeetings(data))

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
