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
  QUICK_BOOKING_MEETING,
  CANCELLING_MEETING,
  INVITING_USER,
  REMOVING_USER,
} from '../constants/uiActions'

const initialState = ''

import uiAction from './uiAction'

describe('uiAction reducer', () => {
  it('sets the approprate state when quickbooking a meeting', () => {
    const newState = uiAction(initialState, { type: INIT_MEETING_FORM, payload: {type: QUICK_BOOKING_MEETING} })
    expect(newState).toBe(QUICK_BOOKING_MEETING)
  })
  it('sets the approprate state when creating a meeting', () => {
    const newState = uiAction(initialState, { type: POPULATE_MEETING_CREATE_FORM })
    expect(newState).toBe(CREATING_MEETING)
  })
  it('sets the approprate state when editing a meeting', () => {
    const newState = uiAction(initialState, { type: POPULATE_MEETING_EDIT_FORM })
    expect(newState).toBe(EDITING_MEETING)
  })
  it('sets the approprate state when cancelling a meeting', () => {
    const newState = uiAction(initialState, { type: OPEN_CANCELLATION_DIALOG })
    expect(newState).toBe(CANCELLING_MEETING)
  })
  it('sets the approprate state when inviting a user', () => {
    const newState = uiAction(initialState, { type: OPEN_INVITE_USER_DIALOG })
    expect(newState).toBe(INVITING_USER)
  })
  it('sets the approprate state when removing a user', () => {
    const newState = uiAction(initialState, { type: OPEN_REMOVE_USER_DIALOG })
    expect(newState).toBe(REMOVING_USER)
  })
  it('sets the approprate state when the ui action is canceled', () => {
    const newState = uiAction(initialState, { type: ABORT_UI_ACTION })
    expect(newState).toBe('')
  })
})
