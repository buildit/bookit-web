import React from 'react'
import { shallow } from 'enzyme'

import ConfirmationDialog from '.'
import Button from '../../01-atoms/Button'

describe('<ConfirmationDialog />', () => {
  const props = {
    onClickYes: jest.fn(),
    onClickNo: jest.fn(),
  }

  it('renders the default message of \'Are you sure?\' when `message` prop is not passed', () => {
    const wrapper = shallow(<ConfirmationDialog {...props} />)
    expect(wrapper.find('p').text()).toEqual('Are you sure?')
  })

  it ('renders the message passed as a prop', () => {
    const message = 'Ever seen two grown men wrestle, bobby?'
    const wrapper = shallow(<ConfirmationDialog {...props} message={message} />)
    expect(wrapper.find('p').text()).toEqual(message)
  })

  it('handles Yes click events', () => {
    const { onClickYes } = props
    const wrapper = shallow(<ConfirmationDialog {...props} />)

    wrapper.find(Button).first().simulate('click')
    expect(onClickYes.mock.calls.length).toBe(1)
  })

  it('handles No click events', () => {
    const { onClickNo } = props
    const wrapper = shallow(<ConfirmationDialog {...props} />)

    wrapper.find(Button).last().simulate('click')
    expect(onClickNo.mock.calls.length).toBe(1)
  })
})
