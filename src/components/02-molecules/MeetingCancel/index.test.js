import React from 'react'
import { shallow } from 'enzyme'

import moment from 'moment'

import Button from '../../01-atoms/Button/index'

import { MeetingCancel } from '.'

describe('<MeetingCancel />', () => {
  const props = {
    meeting: {
      id: 'xyz-321',
      title: 'A Meeting',
      start: moment(),
      end: moment().add(1, 'hour'),
      duration: moment().add(1, 'hour').diff(moment(), 'minutes') / 60,
      roomName: 'roomy mcroomface',
      owner: {
        name: 'some guy',
      },
      isOwnedByUser: true,
    },
    room: {
      name: 'puce',
      email: 'puce-room@some.com',
    },
    abortUiAction: jest.fn(),
    cancelMeeting: jest.fn(),
  }

  it('renders', () => {
    const wrapper = shallow(<MeetingCancel {...props} />)
    expect(wrapper).toBeTruthy()
  })

  it('responds to click events', () => {
    const wrapper = shallow(<MeetingCancel {...props} />)
    const yesButton = wrapper.find(Button).first()
    const noButton = wrapper.find(Button).last()

    yesButton.simulate('click')
    expect(props.cancelMeeting.mock.calls.length).toBe(1)

    noButton.simulate('click')
    expect(props.abortUiAction.mock.calls.length).toBe(1)
  })
})
