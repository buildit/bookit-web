import { createSelector } from 'reselect'

import { createGetSelector } from 'reselect-immutable-helpers'

// User state selectors

export const getCurrentUser = state => state.user
export const getUserToken = state => getCurrentUser(state).token

export const isAuthenticated = state => Boolean(getCurrentUser(state).token)
export const isAnonymous = state => !isAuthenticated(state)
export const isAdmin = state => isAuthenticated(state) && (getCurrentUser(state).id === 3 || getCurrentUser(state).email === 'rasmus@designit.com')

// Application-wide selectedDate state

export const getSelectedDate = state => state.selectedDate

// Entity selectors

export const getRooms = state => state.rooms
export const getMeetings = state => state.meetings
export const getParticipants = state => state.participants

export const getRoomIds = state => getRooms(state).get('result').toArray()
export const getMeetingIds = state => getMeetings(state).get('result').toArray()
export const getParticipantIds = state => getParticipants(state).get('result').toArray()

export const getRoomEntities = state => getRooms(state).get('entities')
export const getMeetingEntities = state => getMeetings(state).get('entities')
export const getParticipantEntities = state => getParticipants(state).get('entities')

export const getRoomEntity = (state, props) => getRoomEntities(state).get(props.id)
export const getMeetingEntity = (state, props) => getMeetingEntities(state).get(props.id)
export const getParticipantEntity = (state, props) => getParticipantEntities(state).get(props.id)

// Composed selectors

// Returns true if there are meetings in the store
export const hasMeetings = createSelector(getMeetingIds, meetingIds => meetingIds.length > 0)

// Returns a List of meeting ids for the given room
export const getRoomMeetings = createSelector(
  [ getMeetingIds, getMeetingEntities, getRoomEntity ],
  (meetingIds, meetings, room) => meetingIds.filter(id => meetings.getIn([id, 'room']) === room.get('email'))
)

// Returns the room entity for the given meeting
// This is a private selector since it's only purpose is to be used
// when selecting room-related entity properties directly onto a
// selected set of meeting entity properties
const getMeetingRoomEntity = createSelector(
  [ getMeetingEntity, getRoomEntities ],
  (meeting, rooms) => rooms.get(meeting.get('room'))
)

// Returns a list of meeting ids that the current user is the owner of
export const getMeetingIdsForCurrentUser = createSelector(
  [ getMeetingIds, getMeetingEntities, getCurrentUser ],
  (meetingIds, meetings, user) => meetingIds.filter(id => meetings.getIn([id, 'owner']) === user.email)
)

// Get Selectors for use with createPropsSelector

export const getMeetingTitle = createGetSelector(getMeetingEntity, 'title')
export const getMeetingStart = createGetSelector(getMeetingEntity, 'start')
export const getMeetingEnd = createGetSelector(getMeetingEntity, 'end')
export const getMeetingRoomName = createGetSelector(getMeetingRoomEntity, 'name')

export const getRoomName = createGetSelector(getRoomEntity, 'name')
export const getRoomEmail = createGetSelector(getRoomEntity, 'email')

export const getParticipantName = createGetSelector(getParticipantEntity, 'name')
export const getParticipantEmail = createGetSelector(getParticipantEntity, 'email')

// NOTE - We never appear to care about meeting owner or participants, but
// someday we might
//
// export const getMeetingOwner
// export const getMeetingParticipants

/* mapStateToProps Factories */

// export const makeRoomIdsStateToProps = () => createPropsSelector({
//   roomIds: getRoomResult,
// })

// export const makeCurrentUserMeetingIdsStateToProps = () => createPropsSelector({
//   meetingIds: getMeetingsForCurrentUser,
// })

// export const makeRoomMeetingIdsStateToProps = () => createPropsSelector({
//   meetingIds: getRoomMeetings,
// })

// export const makeMeetingStateToProps = () => createPropsSelector({
//   title: getMeetingTitle,
//   start: getMeetingStart,
//   end: getMeetingEnd,
//   room: getMeetingRoomName,
// })

// export const makeRoomNameStateToProps = () => createPropsSelector({
//   name: getRoomName,
// })

/* User-related selectors */

