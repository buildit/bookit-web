import React from 'react'
import { shallow } from 'enzyme'

import moment from 'moment'

import { Calendar } from '.'

describe('<Calendar />', () => {

  const props = {
    selectedDate: moment("07-08-2017", "MM-DD-YYYY"),
    handleBackClick: jest.fn(),
    handleForwardClick: jest.fn(),
    date: moment("07-09-2017", "MM-DD-YYYY"),
  }

  it('renders', () => {
    const wrapper = shallow(<Calendar {...props} />)
    expect(wrapper).toBeTruthy()
  })
})
