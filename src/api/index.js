import agent from 'superagent';
import moment from 'moment';

// FIXME: today by default?
const startMoment = moment().startOf('day');
const start = startMoment.format('YYYY-MM-DD');

const end = startMoment.clone().add(1, 'day').format('YYYY-MM-DD');

const fetchMeetings = () => agent.get(`http://localhost:8888/rooms/nyc/meetings?start=${start}&end=${end}`).then(response => {
  const meetings = JSON.parse(response.text);
  return meetings;
})
  .catch(err => {
    console.log(err);
  });

const Api = {
  fetchMeetings,
};

export default Api;
