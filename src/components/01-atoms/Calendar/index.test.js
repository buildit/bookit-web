import React from 'react'
// import PropTypes from 'prop-types'
import { shallow } from 'enzyme'

import moment from 'moment'

import { Calendar } from '.'

describe('<Calendar />', () => {
  // Ripped from StackOverflow -  using these 'options' eems to be the
  // only way I can find to deal with the nested connected components.
  // https://stackoverflow.com/questions/37798741/
  // const store = {
  //   subscribe: () => {},
  //   dispatch: () => {},
  //   getState: () => ({}),
  // }

  // const options = {
  //   context: { store },
  //   childContextTypes: { store: PropTypes.shape({}) },
  // }

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
