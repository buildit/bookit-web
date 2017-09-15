import { createSelector } from 'reselect'

import { createGetSelector, createHasSelector } from 'reselect-immutable-helpers'

import Moment from 'moment'

// User state selectors
// export const getUser = () => ({ id: 3, email: 'bobby@builditcontoso.onmicrosoft.com', name: 'Bruce Springsteen', token: '12345' })
export const getUser = state => state.user
export const getTokens = state => state.tokens
export const getUi = state => state.ui
export const getRooms = state => state.rooms
export const getMeetings = state => state.meetings
export const getParticipants = state => state.participants
export const getSelectedDate = state => state.selectedDate
export const getRouter = state => state.router

export const getUserName = createGetSelector(getUser, 'name', null)
export const getUserEmail = createGetSelector(getUser, 'email', null)
export const getUserId = createGetSelector(getUser, 'id', null)
export const isUserAdmin = createGetSelector(getUser, 'isAdmin', false)

export const hasAuthenticationToken = createHasSelector(getTokens, 'authn')
export const hasAuthorizationToken = createHasSelector(getTokens, 'authz')

export const getAuthenticationToken = createGetSelector(getTokens, 'authn', null)
export const getAuthorizationToken = createGetSelector(getTokens, 'authz', null)

// export const hasAuthenticationToken = createSelector(
//   [ getAuthenticationToken ],
//   authn => Boolean(authn)
// )

// export const hasAuthorizationToken = createSelector(
//   [ getAuthorizationToken ],
//   authz => Boolean(authz)
// )

export const isLoggedIn = createSelector(
  [ hasAuthorizationToken, hasAuthenticationToken ],
  (hasAuthorization, hasAuthentication) => hasAuthorization && hasAuthentication
)

export const getRouterLocation = createSelector(
  [ getRouter ],
  router => router.location
)

// Entity selectors

export const getRoomIds = state => getRooms(state).get('result').toArray()
export const getMeetingIds = state => getMeetings(state).get('result').toArray()
export const getParticipantIds = state => getParticipants(state).get('result').toArray()

export const getRoomEntities = state => getRooms(state).get('entities')
export const getMeetingEntities = state => getMeetings(state).get('entities')
export const getParticipantEntities = state => getParticipants(state).get('entities')

export const getRoomEntity = (state, props) => getRoomEntities(state).get(props.id)
export const getMeetingEntity = (state, props) => getMeetingEntities(state).get(props.id)
export const getParticipantEntity = (state, props) => getParticipantEntities(state).get(props.id)

// Get Selectors for use with createPropsSelector

export const getMeetingTitle = createGetSelector(getMeetingEntity, 'title', null)
export const getMeetingStart = createGetSelector(getMeetingEntity, 'start', null)
export const getMeetingEnd = createGetSelector(getMeetingEntity, 'end', null)
export const getMeetingOwner = createGetSelector(getMeetingEntity, 'owner', null)
export const getMeetingRoom = createGetSelector(getMeetingEntity, 'room', null)

export const getRoomName = createGetSelector(getRoomEntity, 'name', null)
export const getRoomEmail = createGetSelector(getRoomEntity, 'email', null)

export const getParticipantName = createGetSelector(getParticipantEntity, 'name', null)
export const getParticipantEmail = createGetSelector(getParticipantEntity, 'email', null)

// Composed selectors

export const getSelectedDateMoment = createSelector(
  [ getSelectedDate ],
  selectedDate => Moment(selectedDate)
)

// Returns meetingIds for the currently selected date
export const getMeetingIdsForSelectedDate = createSelector(
  [ getSelectedDateMoment, getMeetingIds, getMeetingEntities ],
  (selectedDateMoment, meetingIds, meetings) => {
    return meetingIds.filter(
      id => Moment(meetings.getIn([id, 'start'])).isSame(selectedDateMoment, 'day')
    )
  }
)

// Returns true if there are meetings in the store (regardless of selected date)
export const hasMeetings = createSelector(
  [ getMeetingIds ],
  meetingIds => meetingIds.length > 0
)

// Returns true if there are meetings in the store for the selected date
export const hasMeetingsForSelectedDate = createSelector(
  [ getMeetingIdsForSelectedDate ],
  meetingIds => meetingIds.length > 0
)

// Returns a List of meeting ids for the given room
export const getMeetingsForRoom = createSelector(
  [ getMeetingIds, getMeetingEntities, getRoomEntity ],
  (meetingIds, meetings, room) => meetingIds.filter(id => meetings.getIn([id, 'room']) === room.get('email'))
)

// Returns a list of meeting ids that the current user is the owner of
export const getMeetingsForUser = createSelector(
  [ getMeetingIds, getMeetingEntities, getUserEmail ],
  // (meetingIds, meetings, userEmail) => meetingIds.filter(id => getMeetingOwner(state, id) === userEmail)
  (meetingIds, meetings, userEmail) => meetingIds.filter(id => meetings.getIn([id, 'owner']) === userEmail)
)

// Returns the room entity for the given meeting
// This is a private selector since it's only purpose is to be used
// when selecting room-related entity properties directly onto a
// selected set of meeting entity properties
const getMeetingRoomEntity = createSelector(
  [ getMeetingEntity, getRoomEntities ],
  (meeting, rooms) => rooms.get(meeting.get('room', null), null)
)

// Returns the participant entity for the given meeting
// This is a private selector since it's only purpose is to be used
// when selecting participant-related entity properties directly onto a
// selected set of meeting entity properties
const getMeetingOwnerEntity = createSelector(
  [ getMeetingEntity, getParticipantEntities ],
  (meeting, participants) => participants.get(meeting.get('owner', null), null)
)

export const getMeetingRoomName = createGetSelector(getMeetingRoomEntity, 'name', null)
export const getMeetingOwnerName = createGetSelector(getMeetingOwnerEntity, 'name', null)


// Extensions for specific entity selectors

export const isUserMeetingOwner = createSelector(
  [ getUserEmail, getMeetingOwner ],
  (email, meetingOwner) => meetingOwner === email
)

// export const isMeetingInPast = state => 'bollocks'
// export const isMeetingInFuture = state => 'bollocks'
// export const isHappeningNow = state => 'bollocks'
