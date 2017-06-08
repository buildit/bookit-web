import React from 'react'
import { shallow } from 'enzyme'

import ErrorMessage from './index'
import styles from './styles.scss'

describe('Error Message Component', () => {
  it('sets the proper class', () => {
    const wrapper = shallow(<ErrorMessage message="" />)
    expect(wrapper.hasClass(styles.message)).toBeTruthy()
  })
  it('sets content correctly', () => {
    const content = 'Foo'
    const wrapper = shallow(<ErrorMessage message={content} />)
    expect(wrapper.text()).toEqual(content)
  })
})
