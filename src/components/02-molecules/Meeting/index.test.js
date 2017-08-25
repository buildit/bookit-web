import React from 'react'
import { shallow } from 'enzyme'

import moment from 'moment'

import { Meeting, TIMELINE_WIDTH } from '.'
// import { TooltipContent } from '../../01-atoms/Tooltip/TooltipContent'

// !THIS NEEDS MORE TESTS FOR MEANINGFUL COVERAGE!
//
// At this time, all these tests do is show that the Meeting component
// is perhaps too complex, but to make it any less so would result in
// problems due to its weird nature.

describe('<Meeting />', () => {
  const props = {
    user: {
      name: 'some other user',
      isAdmin: false,
    },
    meeting: {
      id: 'xyz-321',
      title: 'A Meeting',
      start: moment(),
      end: moment().add(1, 'hour'),
      duration: moment().add(1, 'hour').diff(moment(), 'minutes') / 60,
      roomName: 'roomy mcroomface',
      owner: {
        name: 'some guy',
      },
      isOwnedByUser: true,
    },
    onEditClick: jest.fn(),
    requestedMeetingId: 'xyz-123',
  }

  it('renders itself and its child <Tooltip /> using already in-place props', () => {
    const wrapper = shallow(<Meeting {...props} />)
    expect(wrapper).toBeTruthy()
  })

  it('ensures its width is adjusted down when over `TIMELINE_WIDTH`', () => {
    const start = moment().hour(21)
    const end = moment().hour(21).add(4, 'hours')
    const duration = end.diff(start, 'minutes') / 60
    const meeting = { ...props.meeting, start, end, duration }
    const propsCopy = { ...props, meeting }
    const wrapper = shallow(<Meeting {...propsCopy} />)
    expect(wrapper.prop('style').width).toBeLessThan(TIMELINE_WIDTH)
  })
})
