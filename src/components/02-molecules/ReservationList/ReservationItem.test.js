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
})
