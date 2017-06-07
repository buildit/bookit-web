import moment from 'moment'

const fakeUsers = [
  { name: 'Bill Lome', location: 'New York', email: 'bill@designit.com', team: 'DESIGNIT' },
  { name: 'Eunice Chung', location: 'New York', email: 'eunice@designit.com', team: 'DESIGNIT' },
  { name: 'Charles Xavier', location: 'New York', email: 'bah@designit.com', team: 'DESIGNIT' },
  { name: 'z', location: 'New York', email: 'zac@buildit.com', team: 'BUILDIT', dateAdded: moment().subtract(1, 'day') },
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
  { name: 'Peter Rasputin', location: 'New York', email: '666@designit.com', team: 'DESIGNIT' },
  { name: 'Kitty Pryde', location: 'New York', email: '1111@designit.com', team: 'DESIGNIT' },
  { name: 'Anna Marie', location: 'New York', email: '2222@designit.com', team: 'DESIGNIT' },
  { name: 'Rachel Grey', location: 'New York', email: '3333@designit.com', team: 'DESIGNIT' },
  { name: 'Max Eisenhardt', location: 'New York', email: '4444@designit.com', team: 'DESIGNIT' },
  { name: 'Allison Blaire', location: 'New York', email: '5555@designit.com', team: 'DESIGNIT' },
  { name: 'Longshot', location: 'New York', email: '6666@designit.com', team: 'DESIGNIT' },
  { name: 'Betsy Braddock', location: 'New York', email: '11111@designit.com', team: 'DESIGNIT' },
  { name: 'Remy LeBeau', location: 'New York', email: '22222@designit.com', team: 'DESIGNIT' },
  { name: 'Jubilation Lee', location: 'New York', email: '33333@designit.com', team: 'DESIGNIT' },
  { name: 'Lucas Bishop', location: 'New York', email: '44444@designit.com', team: 'DESIGNIT' },
  { name: 'Sam Guthrie', location: 'New York', email: '55555@designit.com', team: 'DESIGNIT' },
  { name: 'Nathan Summers', location: 'New York', email: '66666@designit.com', team: 'DESIGNIT' },
  { name: 'Emma Frost', location: 'New York', email: '1@designit.com', team: 'DESIGNIT' },
  { name: 'Bobby Da Costa', location: 'New York', email: '2@designit.com', team: 'DESIGNIT' },
  { name: 'Amara Aquilla', location: 'New York', email: '3@designit.com', team: 'DESIGNIT' },
  { name: 'Danielle Moonstar', location: 'New York', email: '4@designit.com', team: 'DESIGNIT' },
  { name: 'Illyana Rasputin', location: 'New York', email: '5@designit.com', team: 'DESIGNIT' },
  { name: 'Doug Ramsey', location: 'New York', email: '6@designit.com', team: 'DESIGNIT' },
  { name: 'z', location: 'New York', email: 'zac@buildit.com', team: 'BUILDIT' },
]

const users = (state = [], action) => {
  switch (action.type) {
  case 'NOTHING_YET!': {
    return ['some', 'users']
  }
  default: {
    return fakeUsers
  }
  }
}

export default users
