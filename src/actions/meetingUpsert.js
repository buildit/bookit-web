import { createAction } from 'redux-actions'

import {
  MEETING_UPSERT_START,
  MEETING_UPSERT_SUCCEEDED,
  MEETING_UPSERT_FAILED,
} from './actionTypes'

export const meetingUpsertStart = createAction(MEETING_UPSERT_START)

export const meetingUpsertSucceeded = createAction(MEETING_UPSERT_SUCCEEDED)

export const meetingUpsertFailed = createAction(MEETING_UPSERT_FAILED, message => ({
  message,
}))
