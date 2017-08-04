import React from 'react'
import { shallow } from 'enzyme'

import Header from '.'
import ConditionalRouteLink from '../ConditionalRouteLink'

import { isAdmin } from '../../../utils/check-auth'

import styles from './styles.scss'

jest.mock('../../../utils/check-auth')

describe('<Header />', () => {
  const props = {
    user: { name: 'testy mctestface' },
    logout: jest.fn(),
  }

  it('should welcome the user', () => {
    const wrapper = shallow(<Header {...props} />)
    expect(wrapper.find(`.${styles.name}`).text()).toBe(`${props.user.name}!`)
  })

  it('should show the Link to "Manage Users" if the user is an admin', () => {
    isAdmin.mockImplementationOnce(() => true)

    const wrapper = shallow(<Header {...props} />)

    expect(wrapper.find(ConditionalRouteLink)).toHaveLength(2)
    expect(wrapper.find(ConditionalRouteLink).filterWhere(n => n.prop('children') === 'Manage Users')).toHaveLength(1)
  })

  it('should NOT show the Link to "Manage Users" if the user is not admin', () => {
    isAdmin.mockImplementationOnce(() => false)

    const wrapper = shallow(<Header {...props} />)

    expect(wrapper.find(ConditionalRouteLink)).toHaveLength(1)
    expect(wrapper.find(ConditionalRouteLink).filterWhere(n => n.prop('children') === 'Manage Users')).toHaveLength(0)
  })
})
