import { createAction } from 'redux-actions'

import {
  POPULATE_MEETING_CREATE_FORM,
  POPULATE_MEETING_EDIT_FORM,
  CREATE_MEETING_CANCEL,
  CLOSE_MEETING_DIALOG,
  RESET_UI,
  SELECT_DATE,
  SELECT_DATE_SUCCEEDED,
  OPEN_CANCELLATION_DIALOG,
  CLOSE_CANCELLATION_DIALOG,
} from './actionTypes'

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

export const cancelMeetingRequest = createAction(CREATE_MEETING_CANCEL)

export const closeMeetingDialog = createAction(CLOSE_MEETING_DIALOG)

export const resetUi = createAction(RESET_UI)

export const selectDate = createAction(SELECT_DATE, date => ({ date }))

export const selectDateSucceeded = createAction(SELECT_DATE_SUCCEEDED, date => ({ date }))

export const openCancellationDialog = createAction(OPEN_CANCELLATION_DIALOG)

export const closeCancellationDialog = createAction(CLOSE_CANCELLATION_DIALOG)
