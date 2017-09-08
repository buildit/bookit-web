import {
  getAjax,
} from './ajax'

describe('ajax selectors', () => {
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
    },
    uiAction: '',
  }

  it('gets the ajax status from state', () => {
    const ajax = getAjax(state)
    expect(ajax).toBeFalsy()
  })

})
