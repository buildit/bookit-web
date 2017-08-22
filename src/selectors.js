import { createSelector } from 'reselect'

import { createGetSelector } from 'reselect-immutable-helpers'

// export const getCurrentUser = () => ({ email: 'bruce@builditcontoso.onmicrosoft.com', name: 'Bruce Springsteen', token: '1234abc' })
export const getCurrentUser = state => state.user
export const getUserToken = state => getCurrentUser(state).token

export const getSelectedDate = state => state.selectedDate

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

// Meetings are now sorted at normalizr level.
// Probably for the best.
// export const getSortedMeetings = createSelector(
//   getMeetings,
//   meetings => meetings.sort(
//     (a, b) => moment(a.get('start')) - moment(b.get('start'))
//   )
// )

export const hasMeetings = createSelector(
  getMeetingIds,
  meetingIds => meetingIds.length > 0
)

const getMeetingRoomEntity = createSelector(
  [ getMeetingEntity, getRoomEntities ],
  (meeting, rooms) => rooms.get(meeting.get('room'))
)

export const getMeetingIdsForCurrentUser = createSelector(
  [ getMeetingIds, getMeetingEntities, getCurrentUser ],
  (meetingIds, meetings, user) => meetingIds.filter(id => meetings.getIn([id, 'owner']) === user.email)
)

export const getMeetingIdsForRoom = createSelector(
  [ getMeetingIds, getMeetingEntities, getRoomEntities ],
  (meetingIds, meetings, room) => meetingIds.filter(id => meetings.getIn(id, 'room') === room)
)

export const getMeetingTitle = createGetSelector(getMeetingEntity, 'title')
export const getMeetingStart = createGetSelector(getMeetingEntity, 'start')
export const getMeetingEnd = createGetSelector(getMeetingEntity, 'end')
export const getMeetingRoomName = createGetSelector(getMeetingRoomEntity, 'name')
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

export const isAuthenticated = state => Boolean(getCurrentUser(state).token)
export const isAnonymous = state => !isAuthenticated(state)
export const isAdmin = state => isAuthenticated(state) && (getCurrentUser(state).id === 3 || getCurrentUser(state).email === 'rasmus@designit.com')
