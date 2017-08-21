import React from 'react'
import { mount } from 'enzyme'

import { OpenId } from './index'

import history from '../../history'
jest.mock('../../history')

describe('<OpenId />', () => {
  it('calls the login function when mounted with a success code', () => {
    const login = jest.fn()
    const code = 'xyzzy'
    const location = { hash: `?access_token=${code}` }
    mount(<OpenId login={login} location={location} />)

    expect(login).toBeCalled()
  })

  it('sends the user to the bad login page if there is an error', () => {
    const error = 'access_denied'
    const errorDescription = 'the+user+canceled+the+authentication'
    const location = { hash: `?error=${error}&error_description=${errorDescription}` }
    mount(<OpenId location={location} />)

    expect(history.push).toBeCalled()
  })
})
