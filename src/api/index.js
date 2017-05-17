import agent from 'superagent';
import moment from 'moment';
import configParam from './configParam';

// FIXME: today by default?
const startMoment = moment().startOf('day');
const start = startMoment.format('YYYY-MM-DD');

const end = startMoment.clone().add(1, 'day').format('YYYY-MM-DD');

const apiBaseUrl = configParam('apiBaseUrl', 'http://localhost:8888');

const fakeLogin = () => ({
  email: 'bruce@myews.onmicrosoft.com',
  name: 'Bruce',
  id: 12345,
  token: '12345abcde',
});

const fetchMeetings = () => agent
  .get(`${apiBaseUrl}/rooms/nyc/meetings?start=${start}&end=${end}`).then(response => {
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

const cancelMeeting = (meeting, room) => agent.delete(`${apiBaseUrl}/room/${room.email}/meeting/${meeting.id}`)
  .then((message) => message);

const Api = {
  login: fakeLogin,
  fetchMeetings,
  createMeeting,
  cancelMeeting,
};

export default Api;
