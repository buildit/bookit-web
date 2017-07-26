import { put, call } from 'redux-saga/effects'
import api from '../api'
import {
  userInviteSucceeded,
  userInviteFailed,
  closeInviteUserDialog,
  userRemoveSucceeded,
  userRemoveFailed,
  closeConfirmationDialog,
} from '../actions'

/* eslint-disable import/prefer-default-export */

export function* userInvite(action) {
  const user = action.payload.user

  try {
    const apiUser = yield call(api.addUser, user)
    const newUser = {
      name: apiUser.name,
      location: 'New York',
      email: apiUser.email,
      team: 'WIPRO',
    }
    yield put(userInviteSucceeded(newUser))
    yield put(closeInviteUserDialog())
  } catch (err) {
    yield put(userInviteFailed(err.message))
  }
}

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
