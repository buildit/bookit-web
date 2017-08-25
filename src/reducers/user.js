import { fromJS } from 'immutable'

import * as actions from '../actions'

// { id: 3, email: 'bobby@builditcontoso.onmicrosoft.com', name: 'Bruce Springsteen', token: '12345' }

const initialState = fromJS({
  id: null,
  email: '',
  name: '',
  token: null,
})

const user = (state = initialState, action) => {
  switch(action.type) {
  case actions.SET_USER:
    return state.merge(action.payload)
  default:
    return state
  }
}

export default {
  user,
}
