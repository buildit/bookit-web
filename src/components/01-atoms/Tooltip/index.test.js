import React from 'react'
import { shallow } from 'enzyme'

import moment from 'moment'

import Tooltip from '.'
import TooltipAnchor from './TooltipAnchor'
import TooltipContent from './TooltipContent'

describe('<Tooltip />', () => {
  const props = {
    title: 'A Meeting',
    start: moment(),
    end: moment(),
    roomName: 'roomy mcroomface',
    owner: {
      name: 'some guy',
    },
    user: {
      name: "admin",
      isAdmin: false,
    },
    isOwnedByUser: true,
    isBooking: false,
    tooltipRef: () => true,
    anchorContainerRef: () => true,
    anchorRef: () => true,
    styles: {
      tooltip: 'tooltip',
      content: 'content',
      title: 'title',
      ownerInfo: 'owner-info',
      roomTitle: 'room-title',
      edit: 'edit',
      anchorContainer: 'anchor-container',
      anchor: 'anchor',
    },
    onEditClick: () => true,
  }

  it('renders itself and the <TooltipAnchor /> and <TooltipContent /> child nodes', () => {
    const wrapper = shallow(<Tooltip {...props} />)
    expect(wrapper).toBeTruthy()
    expect(wrapper.find(TooltipAnchor).length).toBe(1)
    expect(wrapper.find(TooltipContent).length).toBe(1)
  })
})
