const fakeUsers = [
  { name: 'Bill Lome', location: 'New York', email: 'bill@designit.com', team: 'DESIGNIT' },
  { name: 'Eunice Chung', location: 'New York', email: 'eunice@designit.com', team: 'DESIGNIT' },
  { name: 'z', location: 'New York', email: 'zac@buildit.com', team: 'BUILDIT' },
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
