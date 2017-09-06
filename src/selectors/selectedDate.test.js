import {
  getSelectedDate,
} from './selectedDate'

describe('selected date selectors', () => {
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
      selectedDate: '2017-09-06',
    },
    uiAction: '',
  }

  it('gets the selected date from state', () => {
    const selectedDate = getSelectedDate(state)
    expect(selectedDate).toBe('2017-09-06')
  })

})
