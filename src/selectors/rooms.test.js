import {
  getRooms,
  getRoomName,
} from './rooms'

describe('rooms selectors', () => {
  const state = {
    user: {
      email: "blurg@blurg.com",
      name: "Blurgy McBlurgFace",
      token: 1234,
      isAdmin: false,
    },
    app: {
      messages: [],
      requestedMeeeting: {},
      allRoomIds: [
        'chartreuse-room@rooms.com',
        'gray-room@rooms.com',
        'orange-room@rooms.com',
        'magenta-room@rooms.com',
      ],
      roomsById: {
        'chartreuse-room@rooms.com': {
          name: 'Chartreuse',
          id: 'chartreuse-room@rooms.com',
        },
        'gray-room@rooms.com': {
          name: 'Gray',
          id: 'gray-room@rooms.com',
        },
        'orange-room@rooms.com': {
          name: 'Orange',
          id: 'orange-room@rooms.com',
        },
        'magenta-room@rooms.com': {
          name: 'Magenta',
          id: 'magenta-room@rooms.com',
        },
      },
    },
    uiAction: '',
  }

  it('gets an arry of rooms from state', () => {
    const user = getRooms(state)
    expect(user).toMatchObject([
      {
        name: 'Chartreuse',
        id: 'chartreuse-room@rooms.com',
      },
      {
        name: 'Gray',
        id: 'gray-room@rooms.com',
      },
      {
        name: 'Orange',
        id: 'orange-room@rooms.com',
      },
      {
        name: 'Magenta',
        id: 'magenta-room@rooms.com',
      },
    ])
  })

  it('when passed a room id, gets the room name from state', () => {
    const userToken = getRoomName(state, 'chartreuse-room@rooms.com')
    expect(userToken).toBe('Chartreuse')
  })

})
