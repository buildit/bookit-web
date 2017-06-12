import React from 'react'
import { shallow } from 'enzyme'

import moment from 'moment'

import Tooltip from '.'

describe('<Tooltip />', () => {
  const props = {
    title: 'A Meeting',
    start: moment(),
    end: moment(),
    roomName: 'roomy mcroomface',
    owner: {
      name: 'some guy',
    },
    isOwnedByUser: true,
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

  it('does a thing', () => {
    const wrapper = shallow(<Tooltip {...props} />)
    expect(wrapper).toBeTruthy()
  })
})
