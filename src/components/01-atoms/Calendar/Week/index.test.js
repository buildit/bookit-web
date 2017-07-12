import React from 'react'
import PropTypes from 'prop-types'
import { shallow, mount } from 'enzyme'

import moment from 'moment'

import Week from '.'
import { Day } from '../Day'


describe('<Week />', () => {
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

  let props
  beforeEach(() => {
    props = {
      week: [
        {
          date: moment("07-02-2017", "MM-DD-YYYY"),
          isInCurrentMonth: true,
          isSelectedDate: false,
          isToday: true,
        },
        {
          date: moment("07-03-2017", "MM-DD-YYYY"),
          isInCurrentMonth: true,
          isSelectedDate: false,
          isToday: true,
        },
        {
          date: moment("07-04-2017", "MM-DD-YYYY"),
          isInCurrentMonth: true,
          isSelectedDate: false,
          isToday: true,
        },
        {
          date: moment("07-05-2017", "MM-DD-YYYY"),
          isInCurrentMonth: true,
          isSelectedDate: false,
          isToday: true,
        },
        {
          date: moment("07-06-2017", "MM-DD-YYYY"),
          isInCurrentMonth: true,
          isSelectedDate: false,
          isToday: true,
        },
        {
          date: moment("07-07-2017", "MM-DD-YYYY"),
          isInCurrentMonth: true,
          isSelectedDate: false,
          isToday: true,
        },
        {
          date: moment("07-08-2017", "MM-DD-YYYY"),
          isInCurrentMonth: true,
          isSelectedDate: false,
          isToday: true,
        },
      ],
    }
  })

  it('renders', () => {
    const wrapper = shallow(<Week {...props} />)
    expect(wrapper).toBeTruthy()
  })

  it('displays 2 (july 2) as the first day of the week', () => {
    const wrapper = mount(<Week {...props} />, options)
    const day = wrapper.find(Day).find('.day').find('.number').first()
    expect(day.text()).toBe('2')
  })

})
