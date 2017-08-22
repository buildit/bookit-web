import agent from 'superagent'
import moment from 'moment'

import { apiBaseUrl } from './utils'

export const createMeeting = (token, meeting, roomEmail) => agent
  .post(`${apiBaseUrl}/room/${roomEmail}/meeting`)
  .set('x-access-token', token)
  .send({
    title: meeting.title,
    start: meeting.start,
    end: meeting.end,
  })
  .then(response => response.body)

export const fetchMeetings = (token, startDate, endDate) => {
  let start = startDate
  let end = endDate

  if (!startDate) {
    start = moment().startOf('day').format('YYYY-MM-DD')
  }

  if (!endDate) {
    end = moment(start).add(1, 'day').format('YYYY-MM-DD')
  }

  return agent
    .get(`${apiBaseUrl}/rooms/nyc/meetings?start=${start}&end=${end}`)
    .set('x-access-token', token)
    .then(response => response.body)
}

export const editMeeting = (token, meeting, roomEmail) => {

  return agent
    .put(`${apiBaseUrl}/room/${roomEmail}/meeting/${meeting.id}`)
    .set('x-access-token', token)
    .send({
      title: meeting.title,
      start: meeting.start,
      end: meeting.end,
    })
    .then(response => response.body)
}

export const cancelMeeting = (token, meetingId, roomEmail) => agent
  .delete(`${apiBaseUrl}/room/${roomEmail}/meeting/${meetingId}`)
  .set('x-access-token', token)
  .then(message => message)
