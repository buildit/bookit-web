import React from 'react'
import { shallow } from 'enzyme'

import Header from '.'

import styles from './styles.scss'

import history from '../../../history'

jest.mock('../../../history')

describe('<Header />', () => {
  const props = {
    user: { name: 'testy mctestface' },
    logout: jest.fn(),
  }

  it('should welcome the user', () => {
    const wrapper = shallow(<Header {...props} />)
    expect(wrapper.find(`.${styles.name}`).text()).toBe(`${props.user.name}!`)
  })

  it('should call history.push when the admin link is clicked', () => {
    const wrapper = shallow(<Header {...props} />)
    wrapper.find(`.${styles.link}`).first().simulate('click')
    expect(history.push.mock.calls.length).toBe(1)
  })
})
