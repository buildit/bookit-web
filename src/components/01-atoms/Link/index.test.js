import React from 'react'
import { shallow } from 'enzyme'

import Link from '.'

const context = {
  router: {
    history: {
      push: jest.fn(),
      replace: jest.fn(),
      createHref: jest.fn(),
    },
  },
}

const event = {
  defaultPrevented: false,
  button: 0,
  metaKey: false,
  altKey: false,
  ctrlKey: false,
  shiftKey: false,
  preventDefault: jest.fn(),
}

beforeEach(() => {
  context.router.history.push.mockClear()
  context.router.history.replace.mockClear()
  context.router.history.createHref.mockClear()
  event.preventDefault.mockClear()
})

describe('<Link />', () => {
  it('renders', () => {
    const wrapper = shallow(<Link to="/nowhere" />, { context })
    expect(wrapper).toBeTruthy()
  })

  it('handles history.push through handleClick', () => {
    const wrapper = shallow(<Link to="/nowhere" />, { context })
    wrapper.simulate('click', event)
    expect(context.router.history.push).toHaveBeenCalled()
  })

  it('uses onClick from props', () => {
    const mockOnClick = jest.fn()
    const wrapper = shallow(<Link to="/nowhere" onClick={mockOnClick} />, { context })
    wrapper.simulate('click', event)
    expect(mockOnClick).toHaveBeenCalled()
  })

  it('uses history.replace when passed `replace` in props', () => {
    const wrapper = shallow(<Link to="/nowhere" replace />, { context })
    wrapper.simulate('click', event)
    expect(context.router.history.replace).toHaveBeenCalled()
  })
})
