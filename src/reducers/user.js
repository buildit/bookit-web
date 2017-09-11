import { fromJS } from 'immutable'

import * as constants from '../constants'

const initialUserState = fromJS({
  email: '',
  name: '',
  isAdmin: false,
})

const user = (state = initialUserState, action) => {
  switch(action.type) {
  case constants.SET_USER:
    return state.merge(action.payload)
  case constants.CLEAR_USER:
    return initialUserState
  }
  return state
}

export default {
  user,
}
