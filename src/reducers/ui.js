import * as constants from '../constants'

const initialState = {
  loggedIn: false,
}

const ui = (state = initialState, action) => {
  switch(action.type) {
  case constants.LOGIN_SUCCESS:
    return { ...state, loggedIn: true }
  case constants.LOGOUT_SUCCESS:
    return { ...state, loggedIn: false }
  }
  return state
}

export default {
  ui,
}
