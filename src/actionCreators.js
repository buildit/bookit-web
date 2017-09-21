import { createAction } from 'redux-actions'

import * as constants from './constants'

export const setAuthentication = createAction(constants.SET_AUTHENTICATION)
export const setAuthorization = createAction(constants.SET_AUTHORIZATION)
export const clearAuth = createAction(constants.CLEAR_AUTH)

export const refreshAuthRequest = createAction(constants.REFRESH_AUTH_REQUEST)
export const refreshAuthSuccess = createAction(constants.REFRESH_AUTH_SUCCESS)
export const refreshAuthFailure = createAction(constants.REFRESH_AUTH_FAILURE)

export const setUser = createAction(constants.SET_USER)
export const clearUser = createAction(constants.CLEAR_USER)

export const loginRequest = createAction(constants.LOGIN_REQUEST)
export const loginSuccess = createAction(constants.LOGIN_SUCCESS)

export const logoutRequest = createAction(constants.LOGOUT_REQUEST)
export const logoutSuccess = createAction(constants.LOGOUT_SUCCESS)

export const authorizeRequest = createAction(constants.AUTHORIZE_REQUEST)

export const selectDate = createAction(constants.SELECT_DATE)
export const incrementDate = createAction(constants.INCREMENT_DATE)
export const decrementDate = createAction(constants.DECREMENT_DATE)

export const fetchRooms = createAction(constants.FETCH_ROOMS)
export const receiveRooms = createAction(constants.RECEIVE_ROOMS)

export const fetchMeetings = createAction(constants.FETCH_MEETINGS)
export const receiveMeetings = createAction(constants.RECEIVE_MEETINGS)
