import React from 'react'
import { shallow } from 'enzyme'

import TimelineLabelList from './index'

describe('<TimelineLabelList />', () => {
  it('just renders 24 elements to represent hours', () => {
    const wrapper = shallow(<TimelineLabelList />)
    expect(wrapper.children().length).toEqual(24)
  })
})
