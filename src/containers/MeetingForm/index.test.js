import React from 'react'
import { shallow } from 'enzyme'

import { MeetingForm } from '.'

describe('<MeetingForm />', () => {

  let props = {
    handleSubmit: jest.fn(),
    submitMeeting: jest.fn(),
    rooms: [{ email: 'flurg-room@blurg.com' }],
    isEditingBooking: false,
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
    const propsCopy = { ...props, isEditingBooking: true }
    const wrapper = shallow(<MeetingForm {...propsCopy} />)
    const title = wrapper.find('.room')
    expect(title.text()).toBe('Book Flurg Room')
  })

  it('displays the proper title when initially opening quickbook (no room selected)', () => {
    const propsCopy = { ...props, roomName: null, isQuickBooking: true }
    const wrapper = shallow(<MeetingForm {...propsCopy} />)
    const title = wrapper.find('.room')
    expect(title.text()).toBe('Book a Room')
  })


})
