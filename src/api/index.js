import agent from 'superagent'
import moment from 'moment'
import configParam from './configParam'

const apiBaseUrl = configParam('apiBaseUrl', 'http://localhost:8888')

const login = (user, password) => agent
  .post(`${apiBaseUrl}/authenticate`)
  .send({ user, password })
  .then(response => response.body)

// Use this one when the server is ready
// const login = (email, password) => agent.post(`${apiBaseUrl}/login`)
//   .send({
//     username: email,
//     password,
//   })
//   .then((response) => {
//     console.log(response);
//     const user = JSON.parse(response.text);
//     return user;
//   })
//   .catch(error => error);

const fetchMeetings = (startDate, endDate) => {
  let start = startDate
  let end = endDate
  if (!startDate) {
    start = moment().startOf('day').format('YYYY-MM-DD')
  }
  if (!endDate) {
    end = moment(start).add(1, 'day').format('YYYY-MM-DD')
  }

  return agent
    .get(`${apiBaseUrl}/rooms/nyc/meetings?start=${start}&end=${end}`).then((response) => {
      const meetings = JSON.parse(response.text)
      return meetings
    })
    .catch((err) => {
      throw new Error(err)
    })
}

const createMeeting = (meeting, room, token) => agent
  .post(`${apiBaseUrl}/room/${room.email}/meeting_protected`)
  .set('x-access-token', token)
  .send({
    title: meeting.title,
    start: meeting.start,
    end: meeting.end,
  })
  .then(message => message)

const cancelMeeting = (meetingId, roomEmail) => agent
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

const Api = {
  login,
  fetchMeetings,
  createMeeting,
  cancelMeeting,
  addUser,
}

export default Api
