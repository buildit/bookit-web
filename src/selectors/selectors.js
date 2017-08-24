import {
  CREATING_MEETING,
  EDITING_MEETING,
  CANCELLING_MEETING,
  QUICK_BOOKING_MEETING,
  INVITING_USER,
  REMOVING_USER,
} from '../constants/uiActions'

export const getUser = state => state.user

export const getUserToken = state => getUser(state).token

export const getRooms = state => state.app.allRoomIds.map(roomId => state.app.roomsById[roomId])
export const getRoomName = (state, id) => {
  if (state.app.roomsById.hasOwnProperty(id)) return state.app.roomsById[id].name
  return null
}

export const getUiAction = state => state.app.uiAction
export const isCreatingBooking = state => getUiAction(state) === CREATING_MEETING
export const isEditingBooking = state => getUiAction(state) === EDITING_MEETING
export const isCancellingBooking = state => getUiAction(state) === CANCELLING_MEETING
export const isQuickBooking = state => getUiAction(state) === QUICK_BOOKING_MEETING
export const isInvitingUser = state => getUiAction(state) === INVITING_USER
export const isRemovingUser = state => getUiAction(state) === REMOVING_USER

export const isBooking = state => (isQuickBooking(state) || isCreatingBooking(state) || isEditingBooking(state))
