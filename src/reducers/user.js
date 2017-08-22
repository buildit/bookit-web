import {
  SET_USER,
  RESET_USER,
} from '../actions/actionTypes'

const initialState = {
  email: null,
  name: null,
  token: null,
  isAdmin: false,
}

const user = (state = initialState, action) => {
  switch (action.type) {
  case SET_USER: {
    return {
      email: action.payload.email,
      name: action.payload.name,
      token: action.payload.token,
      isAdmin: action.payload.isAdmin,
    }
  }
  case RESET_USER: {
    return {
      email: null,
      name: null,
      token: null,
      isAdmin: false,
    }
  }
  default: {
    return state
  }
  }
}

export default user
