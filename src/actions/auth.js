import { createAction } from 'redux-actions'

import {
  LOGIN_START,
  LOGIN_SUCCEEDED,
  LOGIN_FAILED,
  LOGOUT,
  SET_USER,
  RESET_USER,
} from './actionTypes'

export const loginRequest = createAction(LOGIN_START, code => ({ code }))

export const loginSuccess = createAction(LOGIN_SUCCEEDED)

export const loginFailure = createAction(LOGIN_FAILED)

export const logout = createAction(LOGOUT)

export const setClient = createAction(SET_USER)

export const resetUser = createAction(RESET_USER)
