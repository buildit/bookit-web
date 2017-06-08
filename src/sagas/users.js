import { put } from 'redux-saga/effects'

import {
  userRemoveSucceeded,
  userRemoveFailed,
  closeConfirmationDialog,
} from '../actions'

/* eslint-disable import/prefer-default-export */
export function* userRemove(action) {
  try {
    const userEmail = action.payload
    // Make api call here.
    yield put(userRemoveSucceeded(userEmail)) // This should update the redux store
    yield put(closeConfirmationDialog())
  } catch (err) {
    yield put(userRemoveFailed(err.message))
  }
}
