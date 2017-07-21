import React from 'react'
import { shallow } from 'enzyme'

import UIBlocker from './index'

describe('UI Blocker Component', () => {
  it('renders', () => {
    const wrapper = shallow(<UIBlocker />)
    expect(wrapper).toBeTruthy()
  })
})
