import agent from 'superagent';
import moment from 'moment';
import configParam from './configParam';

// FIXME: today by default?
const startMoment = moment().startOf('day');
const start = startMoment.format('YYYY-MM-DD');

const end = startMoment.clone().add(1, 'day').format('YYYY-MM-DD');

const apiBaseUrl = configParam('apiBaseUrl', 'http://localhost:8888');

const login = (user, password) => agent
  .post(`${apiBaseUrl}/authenticate`)
  .send({ user, password })
  .then(response => response.body);

const fetchMeetings = () => agent
  .get(`${apiBaseUrl}/rooms/nyc/meetings?start=${start}&end=${end}`)
  .then(response => {
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
