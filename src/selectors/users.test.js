import {
  getUser,
  getUserToken,
} from './users'

describe('users selectors', () => {
  const state = {
    ajax: false,
    form: {},
    user: {
      email: "blurg@blurg.com",
      name: "Blurgy McBlurgFace",
      token: 1234,
      isAdmin: false,
    },
    app: {
      messages: [],
      requestedMeeeting: {},
    },
    uiAction: '',
  }

  it('gets the user from state', () => {
    const user = getUser(state)
    expect(user).toMatchObject({
      email: "blurg@blurg.com",
      isAdmin: false,
      name: "Blurgy McBlurgFace",
      token: 1234})
  })

  it('gets the user token from state', () => {
    const userToken = getUserToken(state)
    expect(userToken).toBe(1234)
  })

})
