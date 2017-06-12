import React from 'react'
import { shallow } from 'enzyme'

import ErrorMessages from '.'
import ErrorMessage from '../../01-atoms/ErrorMessage'

describe('<ErrorMessages />', () => {
  it('renders a single <ErrorMessage />', () => {
    const props = {
      messages: {
        'test': 'This is a test error message',
      },
      allowableMessages: [ 'test' ],
    }
    const wrapper = shallow(<ErrorMessages {...props} />)
    expect(wrapper.find(ErrorMessage).length).toBe(1)
    expect(wrapper.find(ErrorMessage).first().prop('message')).toEqual(props.messages.test)
  })

  it('filters <ErrorMessage /> messages on `allowableMessage`', () => {
    const props = {
      messages: {
        'test': 'one',
        'tezt': 'two',
        'toast': 'three',
      },
      allowableMessages: [ 'test', 'tezt' ],
    }
    const wrapper = shallow(<ErrorMessages {...props} />)
    expect(wrapper.find(ErrorMessage).length).toBe(2)
  })

  it('has no <ErrorMessage /> entries when nothing is passed', () => {
    const wrapper = shallow(<ErrorMessages />)
    expect(wrapper.find(ErrorMessages).length).toBe(0)
  })
})
