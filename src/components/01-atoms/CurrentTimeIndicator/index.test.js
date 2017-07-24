import React from 'react'
import moment from 'moment'
import { shallow } from 'enzyme'

import { CurrentTimeIndicator } from './index'

import styles from './styles.scss'

const TEST_OFFSET = 963.5
class MockableCurrentTimeIndicator extends CurrentTimeIndicator {
  calculateOffset() {
    return TEST_OFFSET
  }
}

describe('<CurrentTimeIndicator />', () => {
  it('sets the proper class', () => {
    const currentDate = moment()
    const wrapper = shallow(<CurrentTimeIndicator selectedDate={currentDate} />)
    expect(wrapper.hasClass(styles.currentTimeIndicator)).toBeTruthy()
  })
  it('has the right style', () => {
    const selectedDate = moment()
    const calculatedStyle = { left: TEST_OFFSET }

    const wrapper = shallow(<MockableCurrentTimeIndicator selectedDate={selectedDate} />)
    expect(wrapper.get(0).props.style).toEqual(calculatedStyle)
  })
})
