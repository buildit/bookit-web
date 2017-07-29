import { put, call, select } from 'redux-saga/effects'
import api from '../api'
import {
  userInviteSucceeded,
  userInviteFailed,
  closeInviteUserDialog,
  userRemoveSucceeded,
  userRemoveFailed,
  closeConfirmationDialog,
} from '../actions'

import { getUserToken } from '../selectors'

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

export function* fetchUsers() {
  try {
    const token = yield select(getUserToken)
    const usersList = yield call(api.listUsers, token)
    console.log(usersList)
    // yield put(usersFetchSucceeded(usersList))
  } catch (err) {
    console.log(err)
  }

}
