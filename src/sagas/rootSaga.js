import { fork } from 'redux-saga/effects'

import authenticateAndAuthorize from './authSaga'
import watchForFetches from './fetchSaga'

export function* rootSaga() {
  yield fork(authenticateAndAuthorize)
  yield fork(watchForFetches)
}

export default rootSaga
