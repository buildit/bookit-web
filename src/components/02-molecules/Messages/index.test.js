import React from 'react'
import { shallow } from 'enzyme'

import Messages from './index'
import styles from './styles.scss'

describe('Messages Component', () => {
  it('sets the proper class', () => {
    const wrapper = shallow(<Messages messages={['', '']} />)
    expect(wrapper.hasClass(styles.messages)).toBeTruthy()
  })
  it('sets the correct message', () => {
    const correctMessage = 'Foo'
    const wrapper = shallow(<Messages messages={[correctMessage]} />)
    const children = wrapper.find(`.${styles.message}`)
    expect(children.first().text()).toEqual(correctMessage)
  })
  it('sets the correct number of messages', () => {
    const content = ['Foo', 'Bar']
    const wrapper = shallow(<Messages messages={content} />)
    const children = wrapper.find(`.${styles.message}`)
    expect(children.length).toEqual(content.length)
  })
})
