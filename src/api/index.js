import agent from 'superagent';

const fetchUser = id => agent.get(`https://www.reddit.com/r/${id}.json`);

const Api = {
  fetchUser,
};

export default Api;
