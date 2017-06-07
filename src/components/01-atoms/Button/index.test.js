import React from 'react'
import { shallow } from 'enzyme'

import Button from './index'
import styles from './styles.scss'

describe('Button Component', () => {
  it('sets the proper class', () => {
    const wrapper = shallow(<Button type="submit" content="" />)
    expect(wrapper.hasClass(styles.button)).toBeTruthy()
  })
  it('sets the correct type', () => {
    const correctType = 'submit'
    const wrapper = shallow(<Button type={correctType} content="" />)
    expect(wrapper.is(`[type="${correctType}"]`)).toBeTruthy()
  })
  it('sets content correctly', () => {
    const content = 'Foo'
    const wrapper = shallow(<Button type="submit" content={content} />)
    expect(wrapper.text()).toEqual(content)
  })
  it('can be disabled', () => {
    const wrapper = shallow(<Button type="submit" content="" disabled />)
    expect(wrapper.props().disabled).toBe(true)
  })
  it('can set a click function', () => {
    const func = () => (undefined)
    const wrapper = shallow(<Button type="submit" content="" onClick={func} />)
    expect(wrapper.props().onClick).toBe(func)
  })
})
