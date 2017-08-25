import { createSelector } from 'reselect'

import { createGetSelector } from 'reselect-immutable-helpers'

import Moment from 'moment'

// User state selectors
// export const getUser = () => ({ id: 3, email: 'bobby@builditcontoso.onmicrosoft.com', name: 'Bruce Springsteen', token: '12345' })
export const getUser = state => state.user

export const getUserToken = createGetSelector(getUser, 'token', null)
export const getUserName = createGetSelector(getUser, 'name', null)
export const getUserEmail = createGetSelector(getUser, 'email', null)
export const getUserId = createGetSelector(getUser, 'id', null)

export const isAuthenticated = state => Boolean(getUserToken(state))
export const isAnonymous = state => !isAuthenticated(state)
export const isAdmin = state => isAuthenticated(state) && (getUserId(state) === 3 || getUserEmail(state) === 'rasmus@designit.com')

// Application-wide selectedX state

export const getSelectedMeeting = state => state.selectedMeeting
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

export const getRoomEntity = (state, { id }) => getRoomEntities(state).get(id)
export const getMeetingEntity = (state, { id }) => getMeetingEntities(state).get(id)
export const getParticipantEntity = (state, { id }) => getParticipantEntities(state).get(id)

// Composed selectors

export const getSelectedMeetingEntity = createSelector(
  [ getSelectedMeeting, getMeetingEntities ],
  (selectedMeeting, meetings) => meetings.get(selectedMeeting)
)


// Returns true if there are meetings in the store
export const hasMeetings = createSelector(getMeetingIds, meetingIds => meetingIds.length > 0)

// Returns meetingIds for the currently selected date
export const getMeetingIdsForSelectedDate = createSelector(
  [ getSelectedDate, getMeetingIds, getMeetingEntities ],
  (selectedDate, meetingIds, meetings) => {
    const selectedMoment = Moment(selectedDate)
    return meetingIds.filter(
      id => Moment(meetings.getIn([id, 'start'])).isSame(selectedMoment, 'day')
    )
  }
)

// Returns a List of meeting ids for the given room
export const getMeetingsForRoom = createSelector(
  [ getMeetingIds, getMeetingEntities, getRoomEntity ],
  (meetingIds, meetings, room) => meetingIds.filter(id => meetings.getIn([id, 'room']) === room.get('email'))
)

// Returns a list of meeting ids that the current user is the owner of
export const getMeetingsForUser = createSelector(
  [ getMeetingIds, getMeetingEntities, getUser ],
  (meetingIds, meetings, user) => meetingIds.filter(id => meetings.getIn([id, 'owner']) === user.email)
)

// Returns the room entity for the given meeting
// This is a private selector since it's only purpose is to be used
// when selecting room-related entity properties directly onto a
// selected set of meeting entity properties
const getMeetingRoomEntity = createSelector(
  [ getMeetingEntity, getRoomEntities ],
  (meeting, rooms) => rooms.get(meeting.get('room'))
)

// Returns the participant entity for the given meeting
// This is a private selector since it's only purpose is to be used
// when selecting participant-related entity properties directly onto a
// selected set of meeting entity properties
const getMeetingOwnerEntity = createSelector(
  [ getMeetingEntity, getParticipantEntities ],
  (meeting, participants) => participants.get(meeting.get('owner'))
)

export const isMeetingOwner = createSelector(
  [ getMeetingEntity, getUser ],
  (meeting, user) => meeting.get('owner') === user.email
)

// Get Selectors for use with createPropsSelector

export const getMeetingTitle = createGetSelector(getMeetingEntity, 'title')
export const getMeetingStart = createGetSelector(getMeetingEntity, 'start')
export const getMeetingEnd = createGetSelector(getMeetingEntity, 'end')
export const getMeetingRoomName = createGetSelector(getMeetingRoomEntity, 'name')
export const getMeetingOwner = createGetSelector(getMeetingOwnerEntity, 'name')

// export const isMeetingInPast = state => 'bollocks'
// export const isMeetingInFuture = state => 'bollocks'
// export const isHappeningNow = state => 'bollocks'
// export const isUserMeetingOwner = state => 'bollocks'

export const getRoomName = createGetSelector(getRoomEntity, 'name')
export const getRoomEmail = createGetSelector(getRoomEntity, 'email')

export const getParticipantName = createGetSelector(getParticipantEntity, 'name')
export const getParticipantEmail = createGetSelector(getParticipantEntity, 'email')


// const makeMeetingEntitySelectorById = (id) => {
//   const getMeetingId = () => id
//   return createSelector(
//     [ getMeetingId, getMeetingEntities ],
//     (meetingId, meetings) => meetings.get(meetingId)
//   )
// }

// const makeMeetingEntityListItemMapState = (state, ownProps) => {
//   const getMeetingEntityForThisComponent = makeMeetingEntitySelectorById(ownProps.id)
//   const actualMapState = (state, ownProps) => {
//     const meeting = getMeetingEntityForThisComponent(state)
//     return { meeting }
//   }
// }
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
//   meetingIds: getMeetingsForRoom,
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

