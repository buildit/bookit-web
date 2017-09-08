import moment from 'moment'

import {
  getMeetings,
  getMessages,
  getSelectedDate,
  getUserToBeRemoved,
} from './app'

describe('app selectors', () => {
  const state = {
    user: {
      email: "blurg@blurg.com",
    },
    app: {
      allMeetingIds: ['a1', 'b2', 'c3', 'd4'],
      meetingsById: {
        a1: {
          id: 'a1',
          title: 'Meeting a1',
          start: '2017-09-08T06:00:00.000Z',
          end: '2017-09-08T07:00:00.000Z',
          duration: 1.0,
          owner: {
            email: 'flurg@blurg.com',
          },
          roomId: 'blue-room@rooms.com',
          roomName: 'Blue',
        },
        b2: {
          id: 'b2',
          title: 'Meeting b2',
          start: '2017-09-08T10:00:00.000Z',
          end: '2017-09-08T11:00:00.000Z',
          duration: 1.0,
          owner: {
            email: 'blurg@blurg.com',
          },
          roomId: 'blue-room@rooms.com',
          roomName: 'Blue',
        },
        c3: {
          id: 'c3',
          title: 'Meeting c3',
          start: '2017-09-06T06:00:00.000Z',
          end: '2017-09-06T06:30:00.000Z',
          duration: 0.5,
          owner: {
            email: 'flurg@blurg.com',
          },
          roomId: 'blue-room@rooms.com',
          roomName: 'Blue',
        },
        d4: {
          id: 'd4',
          title: 'Meeting d4',
          start: '2017-09-06T08:00:00.000Z',
          end: '2017-09-06T09:00:00.000Z',
          duration: 1.0,
          owner: {
            email: 'blurg@blurg.com',
          },
          roomId: 'blue-room@rooms.com',
          roomName: 'Blue',
        },
      },
      messages: ['Uh oh!'],
      selectedDate: moment('2017-09-06'),
      userToBeRemoved: 'test@users.com',
    },
  }

  it('gets the messages from state', () => {
    const messages = getMessages(state)
    expect(messages).toMatchObject(['Uh oh!'])
  })

  it('gets the meetings from state', () => {
    const meetings = getMeetings(state)
    expect(meetings).toMatchObject([
      {
        duration: 0.5,
        end: '2017-09-06T06:30:00.000Z',
        id: 'c3',
        isOwnedByUser: false,
        owner: {
          email: 'flurg@blurg.com',
        },
        roomId: 'blue-room@rooms.com',
        roomName: 'Blue',
        start: '2017-09-06T06:00:00.000Z',
        title: 'Meeting c3',
      },
      {
        duration: 1.0,
        end: '2017-09-06T09:00:00.000Z',
        id: 'd4',
        isOwnedByUser: true,
        owner: {
          email: 'blurg@blurg.com',
        },
        roomId: 'blue-room@rooms.com',
        roomName: 'Blue',
        start: '2017-09-06T08:00:00.000Z',
        title: 'Meeting d4',
      },
    ])
  })

  it('gets the selected date from state', () => {
    const selectedDate = getSelectedDate(state)
    expect(selectedDate).toEqual(moment('2017-09-06'))
  })

  it('gets the user to be removed from state', () => {
    const user = getUserToBeRemoved(state)
    expect(user).toBe('test@users.com')
  })

})
