import React from 'react'
import { shallow } from 'enzyme'

import moment from 'moment'

import RoomTimeline from '../../02-molecules/RoomTimeline'

import Agenda, { renderRoomTimelines } from '.'

describe('<Agenda />', () => {
  const props = {
    meetings: [],
    rooms: [],
    populateMeetingCreateForm: jest.fn(),
    meetingFormIsActive: false,
  }
  it('renders', () => {
    const wrapper = shallow(<Agenda {...props} />)
    expect(wrapper).toBeTruthy()
  })
})

// This is so laaaaaaaaaaaaaaaame.
describe('#renderRoomTimelines()', () => {
  it('returns an array of <RoomTimeline /> components', () => {
    const user = { name: 'some guy', isAdmin:false }
    const room = { name: 'puce', id: 'puce-room-xyz' }
    const meeting = {
      id: 'xyz-321',
      title: 'A Meeting',
      start: moment(),
      end: moment().add(1, 'hour'),
      duration: moment().add(1, 'hour').diff(moment(), 'minutes') / 60,
      isOwnedByUser: true,
      owner: {
        name: 'some guy',
        email: 'someguy@some.com',
      },
      user: {
        name: 'some other guy',
        isAdmin: false,
      },
      roomName: room.name,
      roomId: room.id,
    }
    const populateMeetingCreateForm = jest.fn()
    const meetingFormIsActive = false
    const result = renderRoomTimelines([room], [meeting], user, populateMeetingCreateForm, meetingFormIsActive)
    expect(result.length).toBe(1)
    expect(shallow(<div>{result[0]}</div>).find(RoomTimeline)).toBeTruthy()
  })
})
