import {
  LOGIN_START,
  LOGIN_SUCCEEDED,
  LOGIN_FAILED,
} from '../actions/actionTypes'

const initialState = {
  requesting: false,
  successful: false,
  message: '',
}

const login = (state = initialState, action) => {
  switch (action.type) {
  case LOGIN_START: {
    return { ...state, requesting: true, successful: false }
  }
  case LOGIN_SUCCEEDED: {
    return { ...state, requesting: false, successful: true }
  }
  case LOGIN_FAILED: {
    const message = action.payload.message

    return {
      ...state,
      requesting: false,
      successful: false,
      message,
    }
  }
  default: {
    return state
  }
  }
}

export default login
