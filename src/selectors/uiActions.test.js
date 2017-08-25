import {
  CREATING_MEETING,
  EDITING_MEETING,
  CANCELLING_MEETING,
  QUICK_BOOKING_MEETING,
  INVITING_USER,
  REMOVING_USER,
} from '../constants/uiActions'

import {
  getUiAction,
  isCreatingBooking,
  isEditingBooking,
  isCancellingBooking,
  isQuickBooking,
  isInvitingUser,
  isRemovingUser,
  isBooking,
} from './uiActions'

describe('uiAction selectors', () => {
  const state = {
    ajax: false,
    form: {},
    user: {
      email: "blurg@blurg.com",
      name: "Blurgy McBlurgFace",
      token: 1234,
      isAdmin: false,
    },
    app: {
      messages: [],
      requestedMeeeting: {},
    },
    uiAction: CREATING_MEETING,
  }

  it('gets the uiAction from state', () => {
    const actionSelector = getUiAction(state)
    expect(actionSelector).toBe(CREATING_MEETING)
  })

  it('returns the proper value for isBooking if user is creating, editing, or quickbooking', () => {
    const stateCopy = { ...state, uiAction: QUICK_BOOKING_MEETING }
    const actionSelector = isBooking(stateCopy)
    expect(actionSelector).toBeTruthy()
  })

  it('returns the proper value for isBooking if user is creating, editing, or quickbooking', () => {
    const stateCopy = { ...state, uiAction: EDITING_MEETING }
    const actionSelector = isBooking(stateCopy)
    expect(actionSelector).toBeTruthy()
  })

  it('returns the proper value for isBooking if user is NOT creating, editing, or quickbooking', () => {
    const stateCopy = { ...state, uiAction: '' }
    const actionSelector = isBooking(stateCopy)
    expect(actionSelector).toBeFalsy()
  })

  it('returns the proper value for isCreatingBooking if user is creating', () => {
    const stateCopy = { ...state, uiAction: CREATING_MEETING }
    const actionSelector = isCreatingBooking(stateCopy)
    expect(actionSelector).toBeTruthy()
  })

  it('returns the proper value for isEditingBooking if user is editing', () => {
    const stateCopy = { ...state, uiAction: EDITING_MEETING }
    const actionSelector = isEditingBooking(stateCopy)
    expect(actionSelector).toBeTruthy()
  })

  it('returns the proper value for isCancellingBooking if user is cancelling', () => {
    const stateCopy = { ...state, uiAction: CANCELLING_MEETING }
    const actionSelector = isCancellingBooking(stateCopy)
    expect(actionSelector).toBeTruthy()
  })

  it('returns the proper value for isQuickBooking if user is quick booking', () => {
    const stateCopy = { ...state, uiAction: QUICK_BOOKING_MEETING }
    const actionSelector = isQuickBooking(stateCopy)
    expect(actionSelector).toBeTruthy()
  })

  it('returns the proper value for isInvitingUser if admin is inviting a user', () => {
    const stateCopy = { ...state, uiAction: INVITING_USER }
    const actionSelector = isInvitingUser(stateCopy)
    expect(actionSelector).toBeTruthy()
  })

  it('returns the proper value for isRemovingUser if admin is removing a user', () => {
    const stateCopy = { ...state, uiAction: REMOVING_USER }
    const actionSelector = isRemovingUser(stateCopy)
    expect(actionSelector).toBeTruthy()
  })

  it('returns the proper value for isRemovingUser if admin is NOT removing a user', () => {
    const stateCopy = { ...state, uiAction: INVITING_USER }
    const actionSelector = isRemovingUser(stateCopy)
    expect(actionSelector).toBeFalsy()
  })

})
