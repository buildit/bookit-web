import { fromJS } from 'immutable'

import * as constants from '../constants'

const initialState = fromJS({
  authn: null,
  authz: null,
})

const updateAuth = (state, authx, payload) => state.set(authx, payload)

const tokens = (state = initialState, action) => {
  switch (action.type) {
  case constants.SET_AUTHENTICATION:
    return updateAuth(state, 'authn', action.payload)
  case constants.SET_AUTHORIZATION:
    return updateAuth(state, 'authz', action.payload)
  case constants.CLEAR_AUTH:
    return initialState
  }
  return state
}

export default {
  tokens,
}
