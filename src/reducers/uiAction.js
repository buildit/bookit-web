import {
  ABORT_UI_ACTION,
  INIT_MEETING_FORM,
  POPULATE_MEETING_CREATE_FORM,
  POPULATE_MEETING_EDIT_FORM,
  OPEN_CANCELLATION_DIALOG,
  OPEN_INVITE_USER_DIALOG,
  OPEN_REMOVE_USER_DIALOG,

} from '../actions/actionTypes'

import {
  CREATING_MEETING,
  EDITING_MEETING,
  CANCELLING_MEETING,
  INVITING_USER,
  REMOVING_USER,
  NO_ACTION,
} from '../constants/uiActions'

const initialState = NO_ACTION

const uiAction = (state = initialState, action) => {
  switch (action.type) {
  case INIT_MEETING_FORM:
    return  action.payload.type
  case POPULATE_MEETING_CREATE_FORM:
    return CREATING_MEETING
  case POPULATE_MEETING_EDIT_FORM:
    return EDITING_MEETING
  case OPEN_CANCELLATION_DIALOG:
    return CANCELLING_MEETING
  case OPEN_INVITE_USER_DIALOG:
    return INVITING_USER
  case OPEN_REMOVE_USER_DIALOG:
    return REMOVING_USER
  case ABORT_UI_ACTION:
    return NO_ACTION
  }
  return state
}

export default uiAction
