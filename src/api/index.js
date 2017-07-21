import agent from 'superagent'
import moment from 'moment'
import configParam from './configParam'

import * as Azure from './azure'

const apiBaseUrl = configParam('apiBaseUrl', 'http://localhost:8888')

const standardErrorResponseTrap = (err) => {
  console.log(err)
  return 'There was a problem communicating with the server.'
}

const login = code => agent
  .post(`${apiBaseUrl}/authenticate`)
  .send({ code })
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
  .catch(standardErrorResponseTrap)

const cancelMeeting = (token, meetingId, roomEmail) => agent
  .delete(`${apiBaseUrl}/room/${roomEmail}/meeting/${meetingId}`)
  .then(message => message)

const addUser = (user, token) => agent
  .post(`${apiBaseUrl}/users`)
  .set('x-access-token', token)
  .send(user)
  .then((response) => {
    const user = JSON.parse(response.text)
    return user
  })

const getOpenIdUrl = () => Azure.signinRequestUrl()

const Api = {
  login,
  fetchMeetings,
  createMeeting,
  cancelMeeting,
  addUser,
  getOpenIdUrl,
}

export default Api
