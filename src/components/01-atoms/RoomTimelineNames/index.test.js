import React from 'react'
import { shallow } from 'enzyme'

import RoomTimelineNames from './index'

describe('<RoomTimelineNames />', () => {
  it('renders elements for each room name passed to it', () => {
    const rooms = [ { name: 'Light Urple' }, { name: 'Puce' }, { name: 'Hot Bologna' } ]
    const wrapper = shallow(<div>{ RoomTimelineNames(rooms)}</div>)
    expect(wrapper.children().length).toBe(3)
    expect(wrapper.childAt(0).text()).toBe(rooms[0].name)
    expect(wrapper.childAt(1).text()).toBe(rooms[1].name)
    expect(wrapper.childAt(2).text()).toBe(rooms[2].name)
  })
})
