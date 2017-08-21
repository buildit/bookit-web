import React from 'react'
import { shallow } from 'enzyme'

import ErrorMessages from '.'
import ErrorMessage from '../../01-atoms/ErrorMessage'

describe('<ErrorMessages />', () => {
  it('renders a single <ErrorMessage />', () => {
    const props = {
      errors: {
        'test': 'This is a test error message',
      },
    }
    const wrapper = shallow(<ErrorMessages {...props} />)
    expect(wrapper.find(ErrorMessage).length).toBe(1)
  })

  it('has no <ErrorMessage /> entries when nothing is passed', () => {
    const wrapper = shallow(<ErrorMessages />)
    expect(wrapper.find(ErrorMessages).length).toBe(0)
  })
})
