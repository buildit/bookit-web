import React from 'react'
import PropTypes from 'prop-types'
import { shallow, mount } from 'enzyme'

import moment from 'moment'

import { Calendar } from '.'
import DateDisplay from './DateDisplay'
import Day from './Day'
// import DayNames from './DayNames'
// import Week from './Week'

describe('<Calendar />', () => {
  // Ripped from StackOverflow -  using these 'options' eems to be the
  // only way I can find to deal with the nested connected components.
  // https://stackoverflow.com/questions/37798741/
  const store = {
    subscribe: () => {},
    dispatch: () => {},
    getState: () => ({}),
  }

  const options = {
    context: { store },
    childContextTypes: { store: PropTypes.shape({}) },
  }

  const props = {
    selectedDate: moment("07-08-2017", "MM-DD-YYYY"),
    handleBackClick: jest.fn(),
    handleForwardClick: jest.fn(),
  }

  it('renders', () => {
    const wrapper = shallow(<Calendar {...props} />)
    expect(wrapper).toBeTruthy()
  })

  it('displays the proper month for the selected date', () => {
    const wrapper = mount(<Calendar {...props} />, options)
    const month = wrapper.find(DateDisplay).find('.dateDisplay').find('.date').find('.month')
    expect(month.text()).toBe('July')
  })

  it('displays the selected date', () => {
    const wrapper = mount(<Calendar {...props} />, options)
    const month = wrapper.find(DateDisplay).find('.dateDisplay').find('.date').find('.day')
    expect(month.text()).toBe('Saturday 8')
  })

  // FIXME: these next two tests need to be changed to handle the current date

  it('underlines todays date', () => {
    const wrapper = mount(<Calendar {...props} />, options)
    const number = wrapper.find(Day).find('.day').find('.number').at(12)
    const numberBorder = number.node.style._values['border-bottom']
    expect(numberBorder).toBe('2px solid white')
  })

  it('does not underline other dates', () => {
    const wrapper = mount(<Calendar {...props} />, options)
    const number = wrapper.find(Day).find('.day').find('.number').at(17)
    const numberBorder = number.node.style._values['border-bottom']
    expect(numberBorder).toBe(undefined)
  })
})
