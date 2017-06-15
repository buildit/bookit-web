import React from 'react'
import { shallow, mount } from 'enzyme'

import moment from 'moment'

import ReservationList from '.'
import styles from './styles.scss'

describe('<ReservationList />', () => {
  const props = {
    handleEditClick: jest.fn(),
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
  }
  it('renders', () => {
    const wrapper = shallow(<ReservationList {...props} />)
    expect(wrapper).toBeTruthy()
  })

  it('responds to button clicks', () => {
    const wrapper = mount(<ReservationList {...props} />)
    wrapper.find(`.${styles.button}`).first().simulate('click')
    expect(props.handleEditClick.mock.calls.length).toBe(1)
  })

  it('does not show "My Reservations" when there are no meetings passed to the component', () => {
    const wrapper = shallow(<ReservationList handleEditClick={props.handleEditClick} />)
    expect(wrapper.find('h2').first().text().length).toBe(0)
  })
})
