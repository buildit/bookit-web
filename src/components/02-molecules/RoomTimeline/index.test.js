import React from 'react'
import { shallow, mount } from 'enzyme'

import moment from 'moment'

import RoomTimeline from '.'
import styles from './styles.scss'

describe('<RoomTimeline />', () => {
  const props = {
    room: {
      name: 'puce',
      email: 'puce-room@some.com',
    },
    meetings: [
      {
        id: 'xyz-321',
        title: 'A Meeting',
        start: moment(),
        end: moment().add(1, 'hour'),
        duration: moment().add(1, 'hour').diff(moment(), 'minutes') / 60,
        roomName: 'roomy mcroomface',
        owner: {
          name: 'some guy',
          email: 'someguy@test.com',
        },
        isOwnedByUser: true,
        roomId: '1',
      },
    ],
    populateMeetingCreateForm: jest.fn(),
    meetingFormIsActive: false,
  }

  it('renders', () => {
    const wrapper = shallow(<RoomTimeline {...props} />)
    expect(wrapper).toBeTruthy()
  })

  it('mounts and sets offsetLeft to 653 (for some reason)', () => {
    const fakeElement = { scrollLeft: 0 }
    const propsCopy = { ...props, meetings: [] }

    /* eslint no-unused-vars: 0 */
    document.getElementById = jest.fn(selector => fakeElement)

    expect(fakeElement.scrollLeft).toEqual(0)
    mount(<RoomTimeline {...propsCopy} />)
    expect(fakeElement.scrollLeft).toEqual(653)
  })

  it('responds to click events', () => {
    const wrapper = shallow(<RoomTimeline {...props} />)
    wrapper.find(`.${styles.meetings}`).first().simulate('click', { nativeEvent: { offsetX: 100 } })
    expect(props.populateMeetingCreateForm.mock.calls.length).toBe(1)
  })
})
