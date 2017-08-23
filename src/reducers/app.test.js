import moment from 'moment'
import {
  RESET_UI,
  POPULATE_MEETING_CREATE_FORM,
  POPULATE_MEETING_EDIT_FORM,
  ABORT_UI_ACTION,
  MEETINGS_FETCH_SUCCEEDED,
  MEETINGS_FETCH_FAILED,
  SELECT_DATE_SUCCEEDED,
  OPEN_CANCELLATION_DIALOG,
  CANCEL_MEETING_SUCCEEDED,
  CANCEL_MEETING_FAILED,
  OPEN_INVITE_USER_DIALOG,
  OPEN_REMOVE_USER_DIALOG,
  USER_INVITE_SUCCEEDED,
  USER_INVITE_FAILED,
  USER_REMOVE_SUCCEEDED,
  USER_REMOVE_FAILED,
} from '../actions/actionTypes'

const initialState = {
  messages: [],
  requestedMeeting: {},
  selectedDate: moment().startOf('day'),
  meetingsById: {},
  allMeetingIds: [],
  roomsById: {},
  allRoomIds: [],
  uiAction: '',
  userToBeRemoved: '',
  meetingEditForm: {
    title: '',
    startTime: moment(),
    endTime: moment(),
  },
  inviteUserForm: {
    email: '',
  },
}

import app from './app'

describe('app reducer', () => {
  it('returns an empty arrays when reset', () => {
    const newState = app(initialState, { type: RESET_UI })
    expect(newState.meetings).toHaveLength(0)
    expect(newState.messages).toHaveLength(0)
  })

  it('sets the approprate state when fetching a meeting', () => {
    const newState = app(initialState, { type: MEETINGS_FETCH_SUCCEEDED, payload:
      {meetingsById: 'meetingsById', allMeetingIds: 'allMeetingIds', roomsById: 'roomsById',allRoomIds: 'allRoomIds'}})
    expect(newState.meetingsById).toEqual('meetingsById')
    expect(newState.allMeetingIds).toEqual('allMeetingIds')
    expect(newState.roomsById).toEqual('roomsById')
    expect(newState.allRoomIds).toEqual('allRoomIds')
  })

  it('sets the approprate state on a Cancel', () => {
    const newState = app(initialState, { type: OPEN_CANCELLATION_DIALOG })
    expect(newState.uiAction).toBe('cancelling')
  })

  it('sets the approprate state when the meeting is cancelled', () => {
    const newState = app(initialState, { type: CANCEL_MEETING_SUCCEEDED })
    expect(newState.uiAction).toBe('')
    expect(newState.messages[0]).toContain('successfully')
  })

  it('sets the approprate state when the meeting was not cancelled', () => {
    const newState = app(initialState, { type: CANCEL_MEETING_FAILED })
    expect(newState.uiAction).toBe('')
    expect(newState.messages[0]).toContain('problem')
  })

  it('sets the approprate state when creating a default meeting', () => {
    const now = moment()
    const newState = app(initialState, { type: POPULATE_MEETING_CREATE_FORM, payload:
      {meeting:  now.hours() + 1, room: {email: 'room@rooms.com'}}})
    expect(newState.uiAction).toBe('creating')
    expect(newState.requestedMeeting).toBeDefined()
  })

  it('sets the approprate state when creating a default meeting in the past', () => {
    const now = moment()
    const newState = app(initialState, { type: POPULATE_MEETING_CREATE_FORM, payload:
      {meeting:  now.hours() -2, room: {email: 'room@rooms.com'}}})
    expect(newState.uiAction).toBe('')
  })

  it('sets the approprate state when filling out meeting data', () => {
    const now = moment()
    const newState = app(initialState, { type: POPULATE_MEETING_EDIT_FORM, payload:
      {meeting: {id: 'ID', title: 'TITLE', start: now.add(1).format(), end: now.add(2).format(), roomId: 'room@room.com', roomName: 'Gray'}}})
    expect(newState.uiAction).toBe('editing')
    expect(newState.requestedMeeting).toBeDefined()
  })

  it('sets the approprate state when closing any info panel dialog', () => {
    const newState = app(initialState, { type: ABORT_UI_ACTION })
    expect(newState.uiAction).toBe('')
    expect(newState.messages).toHaveLength(0)
  })

  it('sets the approprate state when opening the invite dialog', () => {
    const newState = app(initialState, { type: OPEN_INVITE_USER_DIALOG })
    expect(newState.uiAction).toBe('inviting')
  })

  it('sets the approprate state when opening the remove dialog', () => {
    const newState = app(initialState, { type: OPEN_REMOVE_USER_DIALOG })
    expect(newState.uiAction).toBe('removing')
  })

  it('sets the approprate state when inviting a user', () => {
    const newState = app(initialState, { type: USER_INVITE_SUCCEEDED, payload: {email: 'XXX'}})
    expect(newState.messages[0]).toContain('added')
  })

  it('sets the approprate state when user invitation fails', () => {
    const newState = app(initialState, { type: USER_INVITE_FAILED, payload: 'XXX'})
    expect(newState.messages[0]).toContain('XXX')
  })

  it('sets the approprate state when removing a user', () => {
    const newState = app(initialState, { type: USER_REMOVE_SUCCEEDED })
    expect(newState.messages[0]).toContain('Fare thee')
  })

  it('sets the approprate state when removing a user fails', () => {
    const newState = app(initialState, { type: USER_REMOVE_FAILED , payload: 'XXX'})
    expect(newState.messages[0]).toContain('XXX')
  })

  it('sets the approprate state when unable to fetch messages', () => {
    const newState = app(initialState, { type: MEETINGS_FETCH_FAILED })
    expect(newState.messages[0]).toContain('problem fetching')
  })

  it('sets the approprate state when selecting a date', () => {
    const newState = app(initialState, { type: SELECT_DATE_SUCCEEDED , payload: {date: 'December 7, 1942'}})
    expect(newState.selectedDate).toEqual('December 7, 1942')
  })
})
