import React from 'react'
import { shallow } from 'enzyme'

import TooltipAnchor from './TooltipAnchor'

describe('<TooltipAnchor />', () => {
  const props = {
    anchorContainerRef: () => true,
    anchorRef: () => true,
    styles: {
      anchorContainer: 'anchor-container',
      anchor: 'anchor',
    },
  }

  it('renders just peachy', () => {
    const wrapper = shallow(<TooltipAnchor {...props} />)
    expect(wrapper).toBeTruthy()
  })
})
