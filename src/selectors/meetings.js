import { createSelector } from 'reselect'
import { createGetSelector } from 'reselect-immutable-helpers'

import Moment from 'moment'

import { getSelectedDateMoment } from './selectedDate'
import { getRoomEntities, getRoomEntity } from './rooms'
import { getParticipantEntities } from './participants'
import { getUserEmail, isUserAdmin } from './user'

export const getMeetings = state => state.meetings

export const getMeetingIds = state => getMeetings(state).get('result').toArray()

export const getMeetingEntities = state => getMeetings(state).get('entities')

export const getMeetingEntity = (state, props) => getMeetingEntities(state).get(props.id)

export const getMeetingTitle = createGetSelector(getMeetingEntity, 'title', null)
export const getMeetingStart = createGetSelector(getMeetingEntity, 'start', null)
export const getMeetingEnd = createGetSelector(getMeetingEntity, 'end', null)
export const getMeetingOwner = createGetSelector(getMeetingEntity, 'owner', null)
export const getMeetingRoom = createGetSelector(getMeetingEntity, 'room', null)

// Returns meetingIds for the currently selected date
export const getMeetingsForSelectedDate = createSelector(
  [ getSelectedDateMoment, getMeetingIds, getMeetingEntities ],
  (selectedDateMoment, meetingIds, meetings) => {
    return meetingIds.filter(
      id => Moment(meetings.getIn([id, 'start'])).isSame(selectedDateMoment, 'day')
    )
  }
)

// Returns meetingIds owned by the current user for the currently selected date
export const getMeetingsForUserForSelectedDate = createSelector(
  [ getUserEmail, getMeetingsForSelectedDate, getMeetingEntities ],
  (userEmail, meetingIds, meetings) => meetingIds.filter(id => meetings.getIn([id, 'owner']) === userEmail)
)

// Returns true if there are meetings in the store for the selected date
export const hasMeetingsForSelectedDate = createSelector(
  [ getMeetingsForSelectedDate ],
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
  [ getMeetingOwner, getUserEmail ],
  (meetingOwner, email) => meetingOwner === email
)

export const isMeetingInThePast = createSelector(
  [ getMeetingStart, getMeetingEnd ],
  (start, end) => {
    const nowMoment = Moment()
    const startMoment = Moment(start)
    const endMoment = Moment(end)

    const endIsAfterNow = endMoment > nowMoment
    const startIsBeforeNow = startMoment < nowMoment

    if (endIsAfterNow) return startIsBeforeNow
    return endMoment < nowMoment
  }
)

export const isMeetingHappeningNow = createSelector(
  [ getMeetingStart, getMeetingEnd ],
  (start, end) => {
    const nowMoment = Moment()
    const startMoment = Moment(start)
    const endMoment = Moment(end)
    return startMoment >= nowMoment && endMoment <= nowMoment
  }
)

export const isMeetingInTheFuture = createSelector(
  [ isMeetingInThePast, isMeetingHappeningNow ],
  (isMeetingInThePast, isMeetingHappeningNow) => !isMeetingInThePast && !isMeetingHappeningNow
)

// A meeting is considered editable in the following situations:
// - Meeting is NOT in the past, AND...
// - Logged in user IS an admin OR
// - Logged in user IS the meeting owner
export const isMeetingEditable = createSelector(
  [ isUserAdmin, isUserMeetingOwner, isMeetingInThePast ],
  (isUserAdmin, isUserMeetingOwner, isMeetingInThePast) => !isMeetingInThePast && (isUserAdmin || isUserMeetingOwner)
)
