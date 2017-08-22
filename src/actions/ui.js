import { createAction } from 'redux-actions'

import {
  INIT_MEETING_FORM,
  POPULATE_MEETING_CREATE_FORM,
  POPULATE_MEETING_EDIT_FORM,
  ABORT_UI_ACTION,
  RESET_UI,
  SELECT_DATE,
  SELECT_DATE_SUCCEEDED,
  OPEN_CANCELLATION_DIALOG,
  OPEN_INVITE_USER_DIALOG,
  OPEN_REMOVE_USER_DIALOG,
} from './actionTypes'

export const initMeetingForm = createAction(
  INIT_MEETING_FORM,
  (type, meetingId, roomId) => ({ type, meetingId, roomId })
)

export const populateMeetingCreateForm =
  createAction(POPULATE_MEETING_CREATE_FORM, (room, meeting) => ({
    room,

    // TODO: Change this name, for the love of god.
    // Should be something like `hoursFromMidnight`.
    // Example data: Clicking on 8pm produces {meeting: 20.0}, which is crapola-town, obvs.
    meeting,
  }))

export const populateMeetingEditForm =
  createAction(POPULATE_MEETING_EDIT_FORM, meeting => ({ meeting }))

export const abortUiAction = createAction(ABORT_UI_ACTION)

export const resetUi = createAction(RESET_UI)

export const selectDate = createAction(SELECT_DATE, date => ({ date }))

export const selectDateSucceeded = createAction(SELECT_DATE_SUCCEEDED, date => ({ date }))

export const openCancellationDialog = createAction(OPEN_CANCELLATION_DIALOG)

export const openInviteUserDialog = createAction(OPEN_INVITE_USER_DIALOG)

export const openRemoveUserDialog = createAction(OPEN_REMOVE_USER_DIALOG)
