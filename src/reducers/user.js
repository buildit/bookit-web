import {
  SET_USER,
  RESET_USER,
} from '../actions/actionTypes'

const initialState = {
  email: null,
  name: null,
  id: null,
  token: null,
}

const user = (state = initialState, action) => {
  switch (action.type) {
  case SET_USER: {
    return {
      email: action.payload.email,
      name: action.payload.name,
      id: action.payload.id,
      token: action.payload.token,
    }
  }
  case RESET_USER: {
    return {
      email: null,
      name: null,
      id: null,
      token: null,
    }
  }
  default: {
    return state
  }
  }
}

export default user
