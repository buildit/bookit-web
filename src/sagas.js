import { call, put, takeEvery } from 'redux-saga/effects';
import api from './api';
import { MEETINGS_RECEIVED, MEETINGS_FETCH_FAILED, START_MEETINGS_REQUEST } from './actions/actionTypes';

function* fetchMeetings() {
  try {
    const meetings = yield call(api.fetchMeetings);
    yield put({ type: MEETINGS_RECEIVED, meetings });
  } catch (e) {
    yield put({ type: MEETINGS_FETCH_FAILED });
  }
}

function* rootSaga() {
  yield takeEvery(START_MEETINGS_REQUEST, fetchMeetings);
}

export default rootSaga;
