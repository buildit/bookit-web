import React from 'react'
import { shallow } from 'enzyme'

import moment from 'moment'

import {Day} from '.'

describe('<Day />', () => {

  const props = {
    day: {
      date: moment("07-09-2017", "MM-DD-YYYY"),
      isSelectedDate: true,
      isInCurrentMonth: true,
      isToday: true,
    },
    handleClick: jest.fn(),
  }

  it('renders', () => {
    const wrapper = shallow(<Day {...props} />)
    expect(wrapper).toBeTruthy()
  })

  it('underlines todays date', () => {
    const wrapper = shallow(<Day {...props} />)
    const number = wrapper.find('.day').find('.number')
    const numberBorder = number.node.props.style['borderBottom']
    expect(numberBorder).toBe('2px solid white')
  })

  it('underlines todays date', () => {
    props.day.isToday = false
    const wrapper = shallow(<Day {...props} />)
    const number = wrapper.find('.day').find('.number')
    const numberBorder = number.node.props.style['borderBottom']
    expect(numberBorder).toBe(undefined)
  })

  it('applies the correct style for selected date', () => {
    const wrapper = shallow(<Day {...props} />)
    const number = wrapper.find('.day')
    const numberStyle = number.node.props.style['background']
    expect(numberStyle).toBe('#2b3947')
  })

  it('doesnt highlight a date that is not selected', () => {
    props.day.isSelectedDate = false
    const wrapper = shallow(<Day {...props} />)
    const number = wrapper.find('.day')
    const numberStyle = number.node.props.style['background']
    expect(numberStyle).toBe(undefined)
  })

  it('doesnt display a date that is part of a different month', () => {
    props.day.isInCurrentMonth = false
    const wrapper = shallow(<Day {...props} />)
    const number = wrapper.find('.day')
    const numberStyle = number.node.props.style['opacity']
    expect(numberStyle).toBe('0')
  })

  it('displays the correct day number', () => {
    const wrapper = shallow(<Day {...props} />)
    const number = wrapper.find('.day').find('.number')
    expect(number.text()).toBe('9')
  })

})
