import React from 'react'
import { shallow } from 'enzyme'

import CurrentTimeIndicator, { calculatedStyle } from './index'

import styles from './styles.scss'

describe('<CurrentTimeIndicator />', () => {
  it('sets the proper class', () => {
    const wrapper = shallow(<CurrentTimeIndicator />)
    expect(wrapper.hasClass(styles.currentTimeIndicator)).toBeTruthy()
  })
  it('has the right style', () => {
    const wrapper = shallow(<CurrentTimeIndicator />)
    expect(wrapper.get(0).props.style).toEqual(calculatedStyle)
  })
})
