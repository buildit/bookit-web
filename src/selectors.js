import { createSelector } from 'reselect'

import { createGetSelector } from 'reselect-immutable-helpers'

import moment from 'moment'

// export const getCurrentUser = () => ({ email: 'bruce@builditcontoso.onmicrosoft.com', name: 'Bruce Springsteen', token: '1234abc' })
export const getCurrentUser = state => state.user
export const getUserToken = state => getCurrentUser(state).token

export const getSelectedDate = state => state.selectedDate

export const getRoomIds = state => state.data.get('roomIds').toArray()
export const getMeetingIds = state => state.data.get('meetingIds').toArray()

export const getEntities = state => state.data.get('entities')

export const getRooms = state => getEntities(state).get('rooms')
export const getMeetings = state => getEntities(state).get('meetings')

export const getRoom = (state, props) => getRooms(state).get(props.id)
export const getMeeting = (state, props) => getMeetings(state).get(props.id)

export const getSortedMeetings = createSelector(
  getMeetings,
  meetings => meetings.sort(
    (a, b) => moment(a.get('start')) - moment(b.get('start'))
  )
)

const getMeetingRoom = createSelector(
  [ getMeeting, getRooms ],
  (meeting, rooms) => rooms.get(meeting.get('room'))
)

export const getMeetingIdsForCurrentUser = createSelector(
  [ getMeetingIds, getMeetings, getCurrentUser ],
  (meetingIds, meetings, user) => meetingIds.filter(id => meetings.getIn([id, 'owner']) === user.email)
)

export const getMeetingIdsForRoom = createSelector(
  [ getMeetingIds, getMeetings, getRoom ],
  (meetingIds, meetings, room) => meetingIds.filter(id => meetings.getIn(id, 'room') === room)
)

export const getMeetingTitle = createGetSelector(getMeeting, 'title')
export const getMeetingStart = createGetSelector(getMeeting, 'start')
export const getMeetingEnd = createGetSelector(getMeeting, 'end')
export const getMeetingRoomName = createGetSelector(getMeetingRoom, 'name')
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
