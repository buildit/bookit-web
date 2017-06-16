import React from 'react'
import { shallow } from 'enzyme'

import Header from '.'

import styles from './styles.scss'

describe('<Header />', () => {
  const props = {
    user: { name: 'testy mctestface' },
    logout: jest.fn(),
  }

  it('should welcome the user', () => {
    const wrapper = shallow(<Header {...props} />)
    expect(wrapper.find(`.${styles.name}`).text()).toBe(`${props.user.name}!`)
  })
})
