import { createAction } from 'redux-actions'
import moment from 'moment'

import {
  MEETINGS_FETCH_START,
  MEETINGS_FETCH_SUCCEEDED,
  MEETINGS_FETCH_FAILED,
} from './actionTypes'

const normalizeMeetingsResponse = (schedule) => {
  const meetingsById = schedule.reduce((roomSchedule, curr) => {
    const meetings = curr.meetings || []
    meetings.forEach((meeting) => {
      const start = moment(meeting.start)
      const end = moment(meeting.end)
      const duration = end.diff(start, 'minutes') / 60

      roomSchedule[meeting.id] = {
        id: meeting.id,
        title: meeting.title,
        start,
        end,
        duration,
        owner: meeting.owner,
        roomId: curr.room.email,
        roomName: curr.room.name,
      }
    })
    return roomSchedule
  }, {})

  const allMeetingIds = Object.keys(meetingsById)

  const roomsById = allMeetingIds.map(id => meetingsById[id])
    .reduce((rooms, curr) => {
      rooms[curr.roomId] = {
        name: curr.roomName,
        id: curr.roomId,
      }
      return rooms
    }, {})

  // `allRoomIds` determines the order of the rooms.
  const allRoomIds = Object.keys(roomsById).sort()

  return {
    meetingsById,
    allMeetingIds,
    allRoomIds,
    roomsById,
  }
}

export const meetingsFetchStart = createAction(MEETINGS_FETCH_START)

export const meetingsFetchSucceeded =
  createAction(MEETINGS_FETCH_SUCCEEDED, normalizeMeetingsResponse)

export const meetingsFetchFailed =
    createAction(MEETINGS_FETCH_FAILED, message => ({ message }))
