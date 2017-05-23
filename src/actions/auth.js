import { createAction } from 'redux-actions';

import {
  LOGIN_START,
  LOGIN_SUCCEEDED,
  LOGIN_FAILED,
  LOGOUT,
  SET_USER,
  RESET_USER,
} from './actionTypes';

export const loginRequest = createAction(LOGIN_START, user => ({
  email: user.email,
  password: user.password,
}));

export const loginSuccess = createAction(LOGIN_SUCCEEDED);

export const loginFailure = createAction(LOGIN_FAILED);

export const logout = createAction(LOGOUT);

export const setClient = createAction(SET_USER, user => ({
  token: user.token,
  user: user.name,
  name: user.name,
  id: user.id,
  email: user.name, // FIXME: This is weird.
}));

export const resetUser = createAction(RESET_USER);
