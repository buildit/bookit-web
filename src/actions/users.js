import { createAction } from 'redux-actions'

import {
  USER_INVITE_START,
  USER_INVITE_SUCCEEDED,
  USER_INVITE_FAILED,
  USER_REMOVE_START,
  USER_REMOVE_SUCCEEDED,
  USER_REMOVE_FAILED,
  USERS_FETCH_START,
  USERS_FETCH_SUCCEEDED,
 } from './actionTypes'

export const userInviteStart = createAction(USER_INVITE_START, user => ({ user }))

export const userInviteSucceeded = createAction(USER_INVITE_SUCCEEDED)

export const userInviteFailed = createAction(USER_INVITE_FAILED)

export const userRemoveStart = createAction(USER_REMOVE_START)

export const userRemoveSucceeded = createAction(USER_REMOVE_SUCCEEDED)

export const userRemoveFailed = createAction(USER_REMOVE_FAILED)

export const usersFetchStart = createAction(USERS_FETCH_START)
export const usersFetchSucceeded = createAction(USERS_FETCH_SUCCEEDED)
