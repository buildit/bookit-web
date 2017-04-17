import agent from 'superagent';
import moment from 'moment';
import configParam from './configParam';

// FIXME: today by default?
const startMoment = moment().startOf('day');
const start = startMoment.format('YYYY-MM-DD');

const end = startMoment.clone().add(1, 'day').format('YYYY-MM-DD');

const apiBaseUrl = configParam('apiBaseUrl', 'http://localhost:8888');

const login = () => ({
  email: 'bruce@myews.onmicrosoft.com',
  name: 'Bruce',
  id: 12345,
  // token: '12345abcde',
});

// const login = () => {
//   throw new Error();
// };

// const login = (email, password) => agent.post(`${apiBaseUrl}/auth`)
//   .send({
//     email,
//     password,
//   })
//   .then((message) => message)
//   .catch(error => error);

const fetchMeetings = () => agent
  .get(`${apiBaseUrl}/rooms/nyc/meetings?start=${start}&end=${end}`).then(response => {
    const meetings = JSON.parse(response.text);
    return meetings;
  })
  .catch(err => err);

const createMeeting = (meeting, room) => agent.post(`${apiBaseUrl}/room/${room.email}/meeting`)
  .send({
    title: meeting.title,
    start: meeting.start,
    end: meeting.end,
  })
  .then((message) => message);

const Api = {
  login,
  fetchMeetings,
  createMeeting,
};

export default Api;
