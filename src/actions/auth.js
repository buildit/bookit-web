import { createAction } from 'redux-actions';

import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  SET_USER,
  RESET_USER,
} from './actionTypes';

export const loginRequest = createAction(LOGIN_REQUEST, user => ({
  email: user.email,
  password: user.password,
}));

export const loginSuccess = createAction(LOGIN_SUCCESS);

export const loginFailure = createAction(LOGIN_FAILURE);

export const logout = createAction(LOGOUT);

export const setClient = createAction(SET_USER);

export const resetUser = createAction(RESET_USER);
