import React from 'react'
import { shallow } from 'enzyme'

import moment from 'moment'

import { MeetingForm } from '.'

describe('<MeetingForm />', () => {

  let props = {
    handleSubmit: jest.fn(),
    submitMeeting: jest.fn(),
    rooms: [{ email: 'flurg-room@blurg.com' }],
    isEditingMeeting: false,
    isQuickBooking: false,
    handleDeleteClick: jest.fn(),
    roomName: 'Flurg',
    errors: {},
    isFormTouched: false,
    invalid: false,
    initialValues: {
      id: 123456,
      title: 'Blurgity Blurg',
      start: moment().toDate(),
      end: moment().add(1,'hour').toDate(),
      room: 'flurg-room@blurg.com',
    },
  }

  it('renders', () => {
    const wrapper = shallow(<MeetingForm {...props} />)
    expect(wrapper).toBeTruthy()
  })

  it('displays the proper title when creating a meeting', () => {
    const wrapper = shallow(<MeetingForm {...props} />)
    const title = wrapper.find('.room')
    expect(title.text()).toBe('Book Flurg Room')
  })

  it('displays the proper title when editing a meeting', () => {
    props.isEditingMeeting = true
    const wrapper = shallow(<MeetingForm {...props} />)
    const title = wrapper.find('.room')
    expect(title.text()).toBe('Edit Booking')
  })

})
