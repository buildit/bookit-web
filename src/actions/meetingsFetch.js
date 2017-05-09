import { createAction } from 'redux-actions';

import {
  MEETINGS_FETCH_START,
  MEETINGS_FETCH_SUCCEEDED,
  MEETINGS_FETCH_FAILED,
} from './actionTypes';

// MEETINGS FETCH
export const meetingsFetchStart = createAction(MEETINGS_FETCH_START);
export const meetingsFetchSucceeded = createAction(MEETINGS_FETCH_SUCCEEDED);
export const meetingsFetchFailed = createAction(MEETINGS_FETCH_FAILED, message => ({
  message,
}));
