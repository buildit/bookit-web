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
    email: 'zac@buildit.com',
    team: 'WIPRO',
    dateAdded: moment().subtract(1, 'day'),
  },
  { name: 'Scott Summers', location: 'New York', email: '11@designit.com', team: 'DESIGNIT' },
  { name: 'Warren Worthington', location: 'New York', email: '22@designit.com', team: 'DESIGNIT' },
  { name: 'Hank McCoy', location: 'New York', email: '33@designit.com', team: 'DESIGNIT' },
  { name: 'Bobby Drake', location: 'New York', email: '44@designit.com', team: 'DESIGNIT' },
  { name: 'Jean Grey', location: 'New York', email: '55@designit.com', team: 'DESIGNIT' },
  { name: 'Alex Summers', location: 'New York', email: '66@designit.com', team: 'DESIGNIT' },
  { name: 'Lorna Dane', location: 'New York', email: '111@designit.com', team: 'DESIGNIT' },
  { name: 'Kurt Wagner', location: 'New York', email: '222@designit.com', team: 'DESIGNIT' },
  { name: 'James Howlett', location: 'New York', email: '333@designit.com', team: 'DESIGNIT' },
  { name: 'Sean Cassidy', location: 'New York', email: '444@designit.com', team: 'DESIGNIT' },
  { name: 'Ororo Monroe', location: 'New York', email: '555@designit.com', team: 'DESIGNIT' },
  {
    name: 'Peter Rasputin',
    location: 'New York',
    email: '666@designit.com',
    team: 'WIPRO',
    dateAdded: moment().subtract(1, 'day'),
  },
  {
    name: 'Kitty Pryde',
    location: 'New York',
    email: '1111@designit.com',
    team: 'WIPRO',
    dateAdded: moment().subtract(1, 'day'),
  },
  {
    name: 'Anna Marie',
    location: 'New York',
    email: '2222@designit.com',
    team: 'WIPRO',
    dateAdded: moment().subtract(1, 'day'),
  },
  {
    name: 'Rachel Grey',
    location: 'New York',
    email: '3333@designit.com',
    team: 'WIPRO',
    dateAdded: moment().subtract(1, 'day'),
  },
  { name: 'Max Eisenhardt', location: 'New York', email: '4444@designit.com', team: 'WIPRO'},
  { name: 'Allison Blaire', location: 'New York', email: '5555@designit.com', team: 'WIPRO'},
  { name: 'Longshot', location: 'New York', email: '6666@designit.com', team: 'WIPRO'},
  { name: 'Betsy Braddock', location: 'New York', email: '11111@designit.com', team: 'WIPRO'},
  { name: 'Remy LeBeau', location: 'New York', email: '22222@designit.com', team: 'WIPRO'},
  { name: 'Jubilation Lee', location: 'New York', email: '33333@designit.com', team: 'WIPRO'},
  { name: 'Lucas Bishop', location: 'New York', email: '44444@designit.com', team: 'WIPRO'},
  { name: 'Sam Guthrie', location: 'New York', email: '55555@designit.com', team: 'WIPRO'},
  { name: 'Nathan Summers', location: 'New York', email: '66666@designit.com', team: 'WIPRO'},
  { name: 'Emma Frost', location: 'New York', email: '1@designit.com', team: 'WIPRO'},
  { name: 'Bobby Da Costa', location: 'New York', email: '2@designit.com', team: 'WIPRO'},
  { name: 'Amara Aquilla', location: 'New York', email: '3@designit.com', team: 'WIPRO'},
  { name: 'Danielle Moonstar', location: 'New York', email: '4@designit.com', team: 'WIPRO'},
  { name: 'Illyana Rasputin', location: 'New York', email: '5@designit.com', team: 'WIPRO'},
  { name: 'Doug Ramsey', location: 'New York', email: '6@designit.com', team: 'WIPRO'},
]

const users = (state = fakeUsers, action) => {
  switch (action.type) {
  case USER_INVITE_SUCCEEDED: {
    state.push({
      name: action.payload.name,
      // Hard coded for now. No use cases for other locations.
      // We also need to figure out if we can get a notion of 'location'
      // back from Azure
      location: 'New York',
      email: action.payload.email,
      // Right now the only directory we can add users from is Wipro.
      // We may need to change this in the future
      team: 'WIPRO',
      // Find out if Azure stores this info
      dateAdded: moment(),
    })
    return state
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
