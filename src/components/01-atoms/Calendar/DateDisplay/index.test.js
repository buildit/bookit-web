import React from 'react'
import { shallow } from 'enzyme'

import moment from 'moment'

import { DateDisplay } from '.'


describe('<DateDisplay />', () => {

  let props
  beforeEach(() => {
    props = {
      handleBackClick: jest.fn(),
      handleForwardClick: jest.fn(),
      handleTodayClick: jest.fn(),
      date: moment("07-09-2017", "MM-DD-YYYY"),
    }
  })

  it('renders', () => {
    const wrapper = shallow(<DateDisplay {...props} />)
    expect(wrapper).toBeTruthy()
  })

  it('displays the proper month for the selected date', () => {
    const wrapper = shallow(<DateDisplay {...props} />)
    const month = wrapper.find('.dateDisplay').find('.date').find('.month')
    expect(month.text()).toBe('July')
  })

  it('displays the selected date', () => {
    const wrapper = shallow(<DateDisplay {...props} />)
    const month = wrapper.find('.dateDisplay').find('.date').find('.day')
    expect(month.text()).toBe('Sunday 9')
  })

  it('displays today button when selected date is not today', () => {
    props.date = moment().add(1, 'day')
    const wrapper = shallow(<DateDisplay {...props} />)
    const today = wrapper.find('.dateDisplay').find('.today')
    expect(today.text()).toBe('Today')
  })

  it('does not display today button when selected date is today', () => {
    props.date = moment()
    const wrapper = shallow(<DateDisplay {...props} />)
    const today = wrapper.find('.dateDisplay').find('.today')
    expect(today.length).toBe(0)
  })

  it('calls the proper function when the today button is clicked', () => {
    props.date = moment().add(1, 'month')
    const wrapper = shallow(<DateDisplay {...props} />)
    const today = wrapper.find('.dateDisplay').find('.today')
    today.simulate('click')
    expect(props.handleTodayClick.mock.calls.length).toBe(1)
  })

  it('calls the function to change to the previous month when the back arrow is clicked', () => {
    const wrapper = shallow(<DateDisplay {...props} />)
    const back = wrapper.find('.dateDisplay').find('.past')
    back.simulate('click')
    expect(props.handleBackClick.mock.calls.length).toBe(1)
  })

  it('calls the function to change to the previous month when the back arrow is clicked', () => {
    const wrapper = shallow(<DateDisplay {...props} />)
    const back = wrapper.find('.dateDisplay').find('.past')
    back.simulate('click')
    expect(props.handleForwardClick.mock.calls.length).toBe(1)
  })

})
