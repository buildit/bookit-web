import moment from 'moment'

import { USER_INVITE_SUCCEEDED, USER_REMOVE_SUCCEEDED } from '../actions/actionTypes'

const fakeUsers = [
  {
    name: 'Bill Lome',
    location: 'New York',
    email: 'bill@designit.com',
    team: 'DESIGNIT',
    dateAdded: moment().subtract(1, 'day'),
  },
  {
    name: 'Eunice Chung',
    location: 'New York',
    email: 'eunice@designit.com',
    team: 'DESIGNIT',
    dateAdded: moment().subtract(1, 'day'),
  },
  {
    name: 'Charles Xavier',
    location: 'New York',
    email: 'bah@designit.com',
    team: 'DESIGNIT',
    dateAdded: moment().subtract(1, 'day'),
  },
  { name: 'Zac Smith',
    location: 'New York',
    email: 'zac@wipro.com',
    team: 'WIPRO',
    dateAdded: moment().subtract(1, 'day'),
  },
  { name: 'Scott Summers', location: 'New York', email: 'Scott@designit.com', team: 'DESIGNIT' },
  { name: 'Warren Worthington', location: 'New York', email: 'Warren@designit.com', team: 'DESIGNIT' },
  { name: 'Hank McCoy', location: 'New York', email: 'Hank@designit.com', team: 'DESIGNIT' },
  { name: 'Bobby Drake', location: 'New York', email: 'Bobby@designit.com', team: 'DESIGNIT' },
  { name: 'Jean Grey', location: 'New York', email: 'Jean@designit.com', team: 'DESIGNIT' },
  { name: 'Alex Summers', location: 'New York', email: 'Alex@designit.com', team: 'DESIGNIT' },
  { name: 'Lorna Dane', location: 'New York', email: 'Lorna@designit.com', team: 'DESIGNIT' },
  { name: 'Kurt Wagner', location: 'New York', email: 'Kurt@designit.com', team: 'DESIGNIT' },
  { name: 'James Howlett', location: 'New York', email: 'James@designit.com', team: 'DESIGNIT' },
  { name: 'Sean Cassidy', location: 'New York', email: 'Sean@designit.com', team: 'DESIGNIT' },
  { name: 'Ororo Monroe', location: 'New York', email: 'Ororo@designit.com', team: 'DESIGNIT' },
  {
    name: 'Peter Rasputin',
    location: 'New York',
    email: 'Peter@wipro.com',
    team: 'WIPRO',
    dateAdded: moment().subtract(1, 'day'),
  },
  {
    name: 'Kitty Pryde',
    location: 'New York',
    email: 'Kitty@wipro.com',
    team: 'WIPRO',
    dateAdded: moment().subtract(1, 'day'),
  },
  {
    name: 'Anna Marie',
    location: 'New York',
    email: 'Anna@wipro.com',
    team: 'WIPRO',
    dateAdded: moment().subtract(1, 'day'),
  },
  {
    name: 'Rachel Grey',
    location: 'New York',
    email: 'Rachel@wipro.com',
    team: 'WIPRO',
    dateAdded: moment().subtract(1, 'day'),
  },
]

const users = (state = fakeUsers, action) => {
  switch (action.type) {
  case USER_INVITE_SUCCEEDED: {
    const newUser = action.payload
    return [...state, newUser]
  }
  case USER_REMOVE_SUCCEEDED: {
    const emailOfRemovedUser = action.payload
    return state.filter(_user => _user.email !== emailOfRemovedUser)
  }
  default: {
    return state
  }
  }
}

export default users
