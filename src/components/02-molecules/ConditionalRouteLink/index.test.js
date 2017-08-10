import React from 'react'
import { mount } from 'enzyme'

import { MemoryRouter } from 'react-router'

import Link from '../../01-atoms/Link'
import ConditionalRouteLink from '.'

describe('<ConditionalRouteLink />', () => {

  const wrapper = mount(
    <MemoryRouter
      initialEntries={[ '/one', '/two', { pathname: '/three' } ]}
      initialIndex={0}
    >
      <div>
        <ConditionalRouteLink path="/one" to="/two">TWO</ConditionalRouteLink>
        <ConditionalRouteLink path="/two" to="/three">THREE</ConditionalRouteLink>
        <ConditionalRouteLink path="/three" to="/one">ONE</ConditionalRouteLink>
      </div>
    </MemoryRouter>
  )

  const { history } = wrapper.first(MemoryRouter).get(0)

  const getActiveConditionalRouteLink = () => wrapper.find(ConditionalRouteLink).filterWhere(
    n => n.prop('path') === history.location.pathname
  ).first()

  const getLinks = () => wrapper.find(Link)

  it('renders just great', () => {
    const conditionalRouteLinks = wrapper.find(ConditionalRouteLink)

    expect(conditionalRouteLinks).toHaveLength(3)

    expect(
      conditionalRouteLinks.filterWhere(n => n.prop('path') === history.location.pathname)
    ).toHaveLength(1)

    expect(
      conditionalRouteLinks.filterWhere(n => n.prop('path') !== history.location.pathname)
    ).toHaveLength(2)
  })

  it(`renders a <Link /> for the current path "${history.location.pathname}"`, () => {
    history.push('/one')

    const links = getLinks()

    expect(links).toHaveLength(1)
    expect(links.first().prop('to')).toEqual(getActiveConditionalRouteLink().prop('to'))
  })

  it('renders the second <Link /> for the next path', () => {
    const expected = { path: '/two', to: '/three', children: 'THREE' }

    expect(getLinks().first().prop('to')).toEqual(expected.path)

    history.push(getLinks().first().prop('to'))

    const links = getLinks()

    expect(links).toHaveLength(1)
    expect(links.first().prop('to')).toEqual(expected.to)

    expect(getActiveConditionalRouteLink().props()).toMatchObject(expected)
  })

})
