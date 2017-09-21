import { fork } from 'redux-saga/effects'

import startAuthentication from './authSaga'
import awaitFetchMeetings from './fetchSaga'

export function* rootSaga() {
  yield fork(startAuthentication)
  yield fork(awaitFetchMeetings)
}

export default rootSaga
