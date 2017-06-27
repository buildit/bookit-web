import agent from 'superagent'
import moment from 'moment'
import configParam from './configParam'

const apiBaseUrl = configParam('apiBaseUrl', 'http://localhost:8888')

const login = (user, password) => agent
  .post(`${apiBaseUrl}/authenticate`)
  .send({ user, password })
  .then(response => response.body)

const fetchMeetings = (token, startDate, endDate) => {
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

const createMeeting = (token, meeting, room) => agent
  .post(`${apiBaseUrl}/room/${room.email}/meeting`)
  .set('x-access-token', token)
  .send({
    title: meeting.title,
    start: meeting.start,
    end: meeting.end,
  })
  .then(response => response.body)

const cancelMeeting = (token, meetingId, roomEmail) => agent
  .delete(`${apiBaseUrl}/room/${roomEmail}/meeting/${meetingId}`)
  .then(message => message)

const Api = {
  login,
  fetchMeetings,
  createMeeting,
  cancelMeeting,
}

export default Api
