import { createAction } from 'redux-actions'

import {
  USER_REMOVE_START,
  USER_REMOVE_SUCCEEDED,
  USER_REMOVE_FAILED,
 } from './actionTypes'

export const userRemoveStart = createAction(USER_REMOVE_START)

export const userRemoveSucceeded = createAction(USER_REMOVE_SUCCEEDED)

export const userRemoveFailed = createAction(USER_REMOVE_FAILED)
