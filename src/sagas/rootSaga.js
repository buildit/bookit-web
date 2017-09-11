import { fork } from 'redux-saga/effects'

import authSaga from './authSaga'
import meetingSaga from './meetingSaga'

export function* rootSaga() {
  console.log('rootSaga')
  yield fork(authSaga)
  yield fork(meetingSaga)
}

export default rootSaga
