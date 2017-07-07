import React from 'react'
import { shallow } from 'enzyme'

import { Admin } from '.'

describe('<Agenda />', () => {
  const props = {
    location: { pathname: '' },
    onLogoutClick: jest.fn(),
    onRemoveClick: jest.fn(),
  }

  it('renders', () => {
    const wrapper = shallow(<Admin {...props} />)
    expect(wrapper).toBeTruthy()
  })
})
