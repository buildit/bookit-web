import { createGetSelector } from 'reselect-immutable-helpers'

export const getRooms = state => state.rooms

export const getRoomIds = state => getRooms(state).get('result').toArray()

export const getRoomEntities = state => getRooms(state).get('entities')

export const getRoomEntity = (state, props) => getRoomEntities(state).get(props.id)

export const getRoomName = createGetSelector(getRoomEntity, 'name', null)
export const getRoomEmail = createGetSelector(getRoomEntity, 'email', null)
