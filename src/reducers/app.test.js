import moment from 'moment'
import {
  RESET_UI,
  POPULATE_MEETING_CREATE_FORM,
  POPULATE_MEETING_EDIT_FORM,
  CLOSE_CANCELLATION_DIALOG,
  CREATE_MEETING_CANCEL,
  MEETINGS_FETCH_SUCCEEDED,
  MEETINGS_FETCH_FAILED,
  CLOSE_MEETING_DIALOG,
  SELECT_DATE_SUCCEEDED,
  OPEN_CANCELLATION_DIALOG,
  CANCEL_MEETING_SUCCEEDED,
  CANCEL_MEETING_FAILED,
  OPEN_INVITE_USER_DIALOG,
  CLOSE_INVITE_USER_DIALOG,
  OPEN_REMOVE_USER_DIALOG,
  CLOSE_CONFIRMATION_DIALOG,
  USER_INVITE_SUCCEEDED,
  USER_INVITE_FAILED,
  USER_REMOVE_SUCCEEDED,
  USER_REMOVE_FAILED,
} from '../actions/actionTypes'

import getAvailableTimeSlot from '../utils/getAvailableTimeSlot'

const initialState = {
  messages: [],
  requestedMeeting: {},
  selectedDate: moment().startOf('day'),
  meetingsById: {},
  allMeetingIds: [],
  roomsById: {},
  allRoomIds: [],
  isCreatingMeeting: false,
  isEditingMeeting: false,
  isCancellingMeeting: false,
  isInvitingUser: false,
  isRemovingUser: false,
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
    const newState = app(initialState, { type: MEETINGS_FETCH_SUCCEEDED, payload: {meetingsById:  'meetingsById',
                                                                                   allMeetingIds: 'allMeetingIds',
                                                                                   roomsById:     'roomsById',
                                                                                   allRoomIds:    'allRoomIds'}})
    expect(newState.meetingsById).toEqual('meetingsById')
    expect(newState.allMeetingIds).toEqual('allMeetingIds')
    expect(newState.roomsById).toEqual('roomsById')
    expect(newState.allRoomIds).toEqual('allRoomIds')
  })

  it('sets the approprate state on a Cancel', () => {
    const newState = app(initialState, { type: OPEN_CANCELLATION_DIALOG })
    expect(newState.isEditingMeeting).toBeFalsy()
    expect(newState.isCancellingMeeting).toBeTruthy()
  })

  it('sets the approprate state when the meeting is cancelled', () => {
    const newState = app(initialState, { type: CANCEL_MEETING_SUCCEEDED })
    expect(newState.isCancellingMeeting).toBeFalsy()
    expect(newState.messages[0]).toContain('successfully')
  })

  it('sets the approprate state when the meeting was not cancelled', () => {
    const newState = app(initialState, { type: CANCEL_MEETING_FAILED })
    expect(newState.isCancellingMeeting).toBeFalsy()
    expect(newState.messages[0]).toContain('problem')
  })

  it('sets the approprate state when creating a default meeting', () => {
    const now = moment()
    const newState = app(initialState, { type: POPULATE_MEETING_CREATE_FORM, payload: {meeting:  now.hours() + 1,
                                                                                       room: {email: 'room@rooms.com'}}})
    expect(newState.isCreatingMeeting).toBeTruthy()
    expect(newState.requestedMeeting).toBeDefined()
  })

  it('sets the approprate state when creating a default meeting in the past', () => {
    const now = moment()
    const newState = app(initialState, { type: POPULATE_MEETING_CREATE_FORM, payload: {meeting:  now.hours() -2,
                                                                                       room: {email: 'room@rooms.com'}}})
    expect(newState.isCreatingMeeting).toBeFalsy()
  })

  it('sets the approprate state when filling out meeting data', () => {
    const now = moment()
    const newState = app(initialState, { type: POPULATE_MEETING_EDIT_FORM, payload: {meeting: {id: 'ID',
                                                                                               title: 'TITLE',
                                                                                               start: now.add(1).format(),
                                                                                               end: now.add(2).format(),
                                                                                               roomId: 'room@room.com',
                                                                                               roomName: 'Gray'}}})
    expect(newState.isEditingMeeting).toBeTruthy()
    expect(newState.requestedMeeting).toBeDefined()
  })

  it('sets the approprate state when closing a dialog', () => {
    const newState = app(initialState, { type: CLOSE_CANCELLATION_DIALOG })
    expect(newState.isCreatingMeeting).toBeFalsy()
    expect(newState.isEditingMeeting).toBeFalsy()
    expect(newState.isCancellingMeeting).toBeFalsy()
    expect(newState.messages).toHaveLength(0)
  })

  it('sets the approprate state when closing a dialog', () => {
    const newState = app(initialState, { type: CREATE_MEETING_CANCEL })
    expect(newState.isCreatingMeeting).toBeFalsy()
    expect(newState.isEditingMeeting).toBeFalsy()
    expect(newState.isCancellingMeeting).toBeFalsy()
    expect(newState.messages).toHaveLength(0)
  })

  it('sets the approprate state when closing a dialog', () => {
    const newState = app(initialState, { type: CLOSE_MEETING_DIALOG })
    expect(newState.isCreatingMeeting).toBeFalsy()
    expect(newState.isEditingMeeting).toBeFalsy()
    expect(newState.isCancellingMeeting).toBeFalsy()
    expect(newState.messages).toHaveLength(0)
  })

  it('sets the approprate state when opening the invite dialog', () => {
    const newState = app(initialState, { type: OPEN_INVITE_USER_DIALOG })
    expect(newState.isInvitingUser).toBeTruthy()
  })

  it('sets the approprate state when closing the invite dialog', () => {
    const newState = app(initialState, { type: CLOSE_INVITE_USER_DIALOG })
    expect(newState.isInvitingUser).toBeFalsy()
  })

  it('sets the approprate state when opening the remove dialog', () => {
    const newState = app(initialState, { type: OPEN_REMOVE_USER_DIALOG })
    expect(newState.isRemovingUser).toBeTruthy()
  })

  it('sets the approprate state when closing the confirm dialog', () => {
    const newState = app(initialState, { type: CLOSE_CONFIRMATION_DIALOG })
    expect(newState.isRemovingUser).toBeFalsy()
    expect(newState.userToBeRemoved).toHaveLength(0)
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
