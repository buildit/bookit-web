import moment from 'moment';

const fakeUsers = [
  { name: 'Bill Lome', location: 'New York', email: 'bill@designit.com', team: 'DESIGNIT', dateAdded: moment().subtract(1, 'month') },
  { name: 'Eunice Chung', location: 'New York', email: 'eunice@designit.com', team: 'DESIGNIT', dateAdded: moment().subtract(3, 'day') },
  { name: 'z', location: 'New York', email: 'zac@buildit.com', team: 'BUILDIT', dateAdded: moment().subtract(1, 'day') },
];

const users = (state = [], action) => {
  switch (action.type) {
    case 'NOTHING_YET!': {
      return ['some', 'users'];
    }
    default: {
      return fakeUsers;
    }
  }
};

export default users;
