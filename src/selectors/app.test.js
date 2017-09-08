import {
  // getMeetings,
  getMessages,
  getSelectedDate,
  getUserToBeRemoved,
} from './app'

describe('app selectors', () => {
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
      messages: ['Uh oh!'],
      selectedDate: '2017-09-06',
      userToBeRemoved: 'test@users.com',
    },
    uiAction: '',
  }

  it('gets the messages from state', () => {
    const messages = getMessages(state)
    expect(messages).toMatchObject(['Uh oh!'])
  })

  it('gets the selected date from state', () => {
    const selectedDate = getSelectedDate(state)
    expect(selectedDate).toBe('2017-09-06')
  })

  it('gets the user to be removed from state', () => {
    const user = getUserToBeRemoved(state)
    expect(user).toBe('test@users.com')
  })

})
