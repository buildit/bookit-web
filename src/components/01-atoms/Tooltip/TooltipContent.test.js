import React from 'react'
import { shallow } from 'enzyme'

import moment from 'moment'

import { TooltipContent } from './TooltipContent'

describe('<TooltipContent />', () => {
  const props = {
    title: 'A Meeting',
    start: moment(),
    end: moment().add(1, 'hour'),
    roomName: 'roomy mcroomface',
    owner: {
      name: 'some guy',
    },
    isUserAdmin: false,
    isOwnedByUser: true,
    isBooking: false,
    styles: {
      content: 'content',
      title: 'title',
      ownerInfo: 'owner-info',
      roomTitle: 'room-title',
      edit: 'edit',
    },
    onEditClick: () => true,
  }

  it('renders just swell', () => {
    const wrapper = shallow(<TooltipContent {...props} />)
    expect(wrapper).toBeTruthy()
  })

  it('includes owner name when not owned by user', () => {
    const propsCopy = { ...props, isOwnedByUser: false }
    const wrapper = shallow(<TooltipContent {...propsCopy} />)
    expect(wrapper.find('.owner-name').text()).toBe(`by ${props.owner.name}`)
  })

  it('sets owner name to \'me\' when owned by user', () => {
    const propsCopy = { ...props, isOwnedByUser: true }
    const wrapper = shallow(<TooltipContent {...propsCopy} />)
    expect(wrapper.find('.owner-name').text()).toBe('by me')
  })

  it('does not show edit when not owned by user', () => {
    const propsCopy = { ...props, isOwnedByUser: false }
    const wrapper = shallow(<TooltipContent {...propsCopy} />)
    expect(wrapper.find('.edit').length).toBe(0)
  })

  it('shows edit when owned by user and end is not in the past', () => {
    const propsCopy = { ...props, isOwnedByUser: true }
    const wrapper = shallow(<TooltipContent {...propsCopy} />)
    expect(wrapper.find('.edit').length).toBe(1)
  })

  it('does not show edit when the end of the meeting is in the past', () => {
    const propsCopy = { ...props, isOwnedByUser: true, start: moment().subtract(2, 'hours'), end: moment().subtract(1, 'hour') }
    const wrapper = shallow(<TooltipContent {...propsCopy} />)
    expect(wrapper.find('.edit').length).toBe(0)
  })

  it('does not show edit when user owns meeting, but is already editing a meeting', () => {
    const propsCopy = { ...props, isOwnedByUser: true, isBooking: true }
    const wrapper = shallow(<TooltipContent {...propsCopy} />)
    expect(wrapper.find('.edit').length).toBe(0)
  })

  it('edit button is visible to admin users, even if they do not own the meeting', () => {
    const propsCopy = { ...props, isOwnedByUser: false, user: { name: 'admin', isUserAdmin: true } }
    const wrapper = shallow(<TooltipContent {...propsCopy} />)
    expect(wrapper.find('.edit').length).toBe(0)
  })
})
