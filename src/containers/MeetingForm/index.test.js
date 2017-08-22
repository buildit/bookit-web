import React from 'react'
import { shallow } from 'enzyme'

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
  }

  it('renders', () => {
    const wrapper = shallow(<MeetingForm {...props} />)
    expect(wrapper).toBeTruthy()
  })

  it('displays the proper title (with room name) when creating a meeting', () => {
    const wrapper = shallow(<MeetingForm {...props} />)
    const title = wrapper.find('.room')
    expect(title.text()).toBe('Book Flurg Room')
  })

  it('displays the proper title (with room name) when editing a meeting', () => {
    props.isEditingMeeting = true
    const wrapper = shallow(<MeetingForm {...props} />)
    const title = wrapper.find('.room')
    expect(title.text()).toBe('Book Flurg Room')
  })

  it('displays the proper title when initially opening quickbook (no room selected)', () => {
    props.roomName = null
    const wrapper = shallow(<MeetingForm {...props} />)
    const title = wrapper.find('.room')
    expect(title.text()).toBe('Book a Room')
  })


})
