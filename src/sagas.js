import { call, put, takeEvery } from 'redux-saga/effects';
import api from './api';

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* fetchUser(action) {
  try {
    const user = yield call(api.fetchUser, action.userId);
    yield put({ type: 'USER_FETCH_SUCCEEDED', user });
  } catch (e) {
    yield put({ type: 'USER_FETCH_FAILED', message: e.message });
  }
}

function* fetchRooms() {
  const rooms = [
    {
      name: 'Red',
      meetings: [
        {
          startTime: '2017-03-24T07:00:00-04:00', // ISO8601 format YYYY-MM-DDTHH:mm:ssZ
          duration: 1.0, // hours
          isOwnedByUser: true,
        },
        {
          startTime: '2017-03-24T10:00:00-04:00', // ISO8601 format YYYY-MM-DDTHH:mm:ssZ
          duration: 5.0, // hours
          isOwnedByUser: false,
        },
      ],
    },
    { name: 'Green', meetings: [] },
    {
      name: 'Blue',
      meetings: [
        {
          startTime: '2017-03-24T15:00:00-04:00', // ISO8601 format YYYY-MM-DDTHH:mm:ssZ
          duration: 1.5, // hours
          isOwnedByUser: true,
        },
      ],
    },
    { name: 'Black', meetings: [] },
    { name: 'Orange', meetings: [] },
    { name: 'Pink', meetings: [] },
    { name: 'White', meetings: [] },
    { name: 'Violet', meetings: [] },
    { name: 'Yellow', meetings: [] },
  ];
  console.log('I AM YIELDING SOME SHIT');
  yield put({ type: 'ROOMS_RECEIVED', rooms });
}

function* rootSaga() {
  yield takeEvery('ROOMS_REQUESTED', fetchRooms);
  yield takeEvery('USER_FETCH_REQUESTED', fetchUser);
}

export default rootSaga;
