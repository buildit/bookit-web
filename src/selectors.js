export const getUser = state => state.user

export const getUserToken = state => getUser(state).token

export const getRooms = state => state.app.allRoomIds.map(roomId => state.app.roomsById[roomId])
export const getRoomName = (state, id) => {
  if (state.app.roomsById.hasOwnProperty(id)) return state.app.roomsById[id].name
  return null
}

export const getUiAction = state => state.app.uiAction
export const isQuickBooking = state => getUiAction(state) === 'quickBooking'
export const isCreatingBooking = state => getUiAction(state) === 'creating'
export const isEditingBooking = state => getUiAction(state) === 'editing'
export const isInvitingUser = state => getUiAction(state) === 'inviting'
export const isRemovingUser = state => getUiAction(state) === 'removing'
export const isCancellingBooking = state => getUiAction(state) === 'cancelling'

export const isBooking = state => (isQuickBooking(state) || isCreatingBooking(state) || isEditingBooking(state))
