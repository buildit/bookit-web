export const getUser = state => state.user

export const getUserToken = state => getUser(state).token

export const getRooms = state => state.app.allRoomIds.map(roomId => state.app.roomsById[roomId])
export const getRoomName = (state, id) => {
  if (state.app.roomsById.hasOwnProperty(id)) return state.app.roomsById[id].name
  return null
}
