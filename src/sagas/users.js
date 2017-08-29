import { put, call, select } from 'redux-saga/effects'
import moment from 'moment'

import api from '../api'
import {
  userInviteSucceeded,
  userInviteFailed,
  abortUiAction,
  // userRemoveSucceeded,
  userRemoveFailed,
  usersFetchSucceeded,
} from '../actions'

import { getUserToken } from '../selectors'

/* eslint-disable import/prefer-default-export */

export function* userInvite(action) {
  const user = action.payload.user

  try {
    const apiUser = yield call(api.addUser, user)
    const newUser = {
      email: apiUser.email,
      team: 'WIPRO',
    }
    yield put(userInviteSucceeded(newUser))
    yield put(abortUiAction())
  } catch (err) {
    yield put(userInviteFailed(err.message))
  }
}

export function* userRemove() {
  yield put(userRemoveFailed('Removing users has not yet been implemented. The user was not actually removed.'))
  yield put(abortUiAction())
  // try {
  //   const userEmail = action.payload
  //   // Make api call here.
  //   yield put(userRemoveSucceeded(userEmail)) // This should update the redux store
  //   yield put(closeConfirmationDialog())
  // } catch (err) {
  //   yield put(userRemoveFailed(err.message))
  // }
}

export function* fetchUsers() {
  try {
    const token = yield select(getUserToken)
    const usersList = yield call(api.listUsers, token)
    const mapToBookitFormat = user => ({
      ...user,
      dateAdded: user.createdDateTime ? moment(user.createdDateTime) : null,
    })
    yield put(usersFetchSucceeded(usersList.map(mapToBookitFormat)))
  } catch (err) {
    console.log(err)
  }

}
