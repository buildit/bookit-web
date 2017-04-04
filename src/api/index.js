import agent from 'superagent';
import moment from 'moment';

const fetchUser = id => agent.get(`https://www.reddit.com/r/${id}.json`);

// FIXME: today by default?
const startMoment = moment('2017-04-05');
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
  fetchUser,
  fetchMeetings,
};

export default Api;
