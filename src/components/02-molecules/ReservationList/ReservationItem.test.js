import React from 'react'
import { shallow } from 'enzyme'

import moment from 'moment'

import ReservationItem from './ReservationItem'
import styles from './styles.scss'

describe('<ReservationItem />', () => {
  const props = {
    styles,
    meeting: {
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
    onClick: jest.fn(),
  }
  it('renders', () => {
    const wrapper = shallow(<ReservationItem {...props} />)
    expect(wrapper).toBeTruthy()
  })

  it('displays the title', () => {
    const wrapper = shallow(<ReservationItem {...props} />)
    expect(wrapper.find('.title').text()).toBe('A Meeting')
  })

  it('displays the time in the proper format', () => {
    const propsCopy = { ...props, meeting: {start: moment('Fri Aug 04 2017 14:51:34'), end: moment('Fri Aug 04 2017 15:51:34')} }
    const wrapper = shallow(<ReservationItem {...propsCopy} />)
    expect(wrapper.find('.time').text()).toBe('2:51pm - 3:51pm')
  })

  it('displays the room name', () => {
    const wrapper = shallow(<ReservationItem {...props} />)
    expect(wrapper.find('.room').text()).toBe('roomy mcroomface Room')
  })

  it('does not allow the user to edit if the meeting is over', () => {
    const propsCopy = { ...props, meeting: {start: moment().subtract(3, 'hours'), end: moment().subtract(1, 'hour')} }
    const wrapper = shallow(<ReservationItem {...propsCopy} />)
    expect(wrapper.find('.button').length).toBe(0)
  })

  it('displays an edit button if the meeting is in the future', () => {
    const wrapper = shallow(<ReservationItem {...props} />)
    expect(wrapper.find('.button').length).toBe(1)
  })

})
