import agent from 'superagent';
import moment from 'moment';
import configParam from './configParam';

// FIXME: The default days in the future should be in the config.
const startMoment = moment().startOf('day');
const start = startMoment.format('YYYY-MM-DD');

const end = startMoment.clone().add(7, 'day').format('YYYY-MM-DD');

const apiBaseUrl = configParam('apiBaseUrl', 'http://localhost:8888');

const login = (user, password) => agent
  .post(`${apiBaseUrl}/authenticate`)
  .send({ user, password })
  .then(response => response.body);

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

const fetchMeetings = (startDate = start, endDate = end) => agent
  .get(`${apiBaseUrl}/rooms/nyc/meetings?start=${startDate}&end=${endDate}`).then(response => {
    const meetings = JSON.parse(response.text);
    return meetings;
  })
  .catch(err => {
    throw new Error(err);
  });

const createMeeting = (meeting, room, token) => agent
  .post(`${apiBaseUrl}/room/${room.email}/meeting_protected`)
  .set('x-access-token', token)
  .send({
    title: meeting.title,
    start: meeting.start,
    end: meeting.end,
  })
  .then((message) => message);

const cancelMeeting = (meetingId, roomEmail) => agent
  .delete(`${apiBaseUrl}/room/${roomEmail}/meeting/${meetingId}`)
  .then((message) => message);

const Api = {
  login,
  fetchMeetings,
  createMeeting,
  cancelMeeting,
};

export default Api;
