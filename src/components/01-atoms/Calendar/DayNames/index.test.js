import React from 'react'
import { shallow } from 'enzyme'

import DayNames from '.'

describe('<DayNames />', () => {

  it('renders', () => {
    const wrapper = shallow(<DayNames />)
    expect(wrapper).toBeTruthy()
  })

})
