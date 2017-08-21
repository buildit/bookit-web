import { createSelector } from 'reselect'

import { createGetSelector } from 'reselect-immutable-helpers'
// import { createGetSelector, createPropsSelector } from 'reselect-immutable-helpers'

import moment from 'moment'

export const getUser = state => state.user
export const getUserToken = state => getUser(state).token
// export const getMeetingsByDate = state => state.meetingsByDate

// Strings _are_ immutable, stupidhead!
export const getSelectedDate = state => state.selectedDate

// NOTE - No use for these two as yet (although getEntities should be used
// to be "fully reselect")
//
// const getEntities = state => state.meetings.get('entities').toJS()
const getEntities = state => state.entities

const getRooms = state => getEntities(state).get('rooms')
export const getMeetings = state => getEntities(state).get('meetings')

// NOTE - We don't have any use for the collected `user` entities as yet
//
// const getUsersMap = state => state.meetings.getIn(['entities', 'users'])

// const getRoom = (state, props) => getRooms(state).get(props.roomId)
const getMeeting = (state, props) => getMeetings(state).get(props.meetingId)

export const getCurrentUser = state => state.user


// export const getRoomName = createGetSelector(getRoom, 'name')

// export const getRoomMeetings = createGetSelector(getRoom, 'meetings', List())

const getSortedMeetings = createSelector(
  getMeetings,
  meetings => meetings.sort(
    (a, b) => moment(a.get('start')) - moment(b.get('start'))
  )
)

const getMeetingRoom = createSelector(
  [ getMeeting, getRooms ],
  (meeting, rooms) => rooms.get(meeting.get('room'))
)

export const getMeetingsForCurrentUser = createSelector(
  [ getSortedMeetings, getCurrentUser ],
  (meetings, user) => [
    ...meetings.filter(
      meeting => meeting.get('owner') === user.email
    ).keys(),
  ]
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
