import agent from 'superagent';
import moment from 'moment';
import configParam from './configParam';

// FIXME: The default days in the future should be in the config.
const startMoment = moment().startOf('day');
const start = startMoment.format('YYYY-MM-DD');

const end = startMoment.clone().add(7, 'day').format('YYYY-MM-DD');

const apiBaseUrl = configParam('apiBaseUrl', 'http://localhost:8888');

const fakeLogin = () => ({
  email: 'bruce@myews.onmicrosoft.com',
  name: 'Bruce',
  id: 12345,
  token: '12345abcde',
});

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

const createMeeting = (meeting, room) => agent.post(`${apiBaseUrl}/room/${room.email}/meeting`)
  .send({
    title: meeting.title,
    start: meeting.start,
    end: meeting.end,
  })
  .then((message) => message);

const cancelMeeting = (meetingId, roomEmail) => agent.delete(`${apiBaseUrl}/room/${roomEmail}/meeting/${meetingId}`)
  .then((message) => message);

const Api = {
  login: fakeLogin,
  fetchMeetings,
  createMeeting,
  cancelMeeting,
};

export default Api;
