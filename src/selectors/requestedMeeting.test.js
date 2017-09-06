import {
  getRequestedMeeting,
  getRequestedMeetingRoom,
  getRequestedMeetingId,
} from './requestedMeeting'

describe('requestedMeeting selectors', () => {
  const state = {
    ajax: false,
    form: {},
    user: {
      email: "blurg@blurg.com",
      name: "Blurgy McBlurgFace",
      token: 1234,
      isAdmin: false,
    },
    app: {
      requestedMeeting: {
        id: 'xyz123',
        start: '2017-09-06T23:00:29.268Z',
        end: '2017-09-07T00:00:29.268Z',
        room: {
          email: 'maroon-room@buildit.com',
          name: 'Maroon',
        },
      },
    },
    uiAction: '',
  }

  it('gets the requested meeting from state', () => {
    const meeting = getRequestedMeeting(state)
    expect(meeting).toMatchObject({
      id: 'xyz123',
      start: '2017-09-06T23:00:29.268Z',
      end: '2017-09-07T00:00:29.268Z',
      room: {
        email: 'maroon-room@buildit.com',
        name: 'Maroon',
      },
    })
  })

  it('gets requested meeting room', () => {
    const meetingRoom = getRequestedMeetingRoom(state)
    expect(meetingRoom).toMatchObject({
      email: 'maroon-room@buildit.com',
      name: 'Maroon',
    })
  })

  it('gets requested meeting id', () => {
    const meetingId = getRequestedMeetingId(state)
    expect(meetingId).toBe('xyz123')
  })

})
