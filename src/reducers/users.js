import { USER_INVITE_SUCCEEDED, USER_REMOVE_SUCCEEDED, USERS_FETCH_SUCCEEDED } from '../actions/actionTypes'

const users = (state = [], action) => {
  switch (action.type) {
  case USER_INVITE_SUCCEEDED: {
    const newUser = action.payload
    return [...state, newUser]
  }
  case USER_REMOVE_SUCCEEDED: {
    const emailOfRemovedUser = action.payload
    return state.filter(_user => _user.email !== emailOfRemovedUser)
  }
  case USERS_FETCH_SUCCEEDED: {
    const users = action.payload
    return users
  }
  default: {
    return state
  }
  }
}

export default users
