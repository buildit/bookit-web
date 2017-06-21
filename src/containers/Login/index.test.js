import React from 'react'
import { shallow } from 'enzyme'

import Login from './index'

describe('<Login />', () => {
  it('times out properly', () => {
    jest.useFakeTimers()
    const wrapper = shallow(<Login />);
    expect(setTimeout.mock.calls.length).toBe(1)
  });
})
