import { fromJS } from 'immutable'

import { createReducer } from './reducer-utilities'

import * as constants from '../constants'

const setAuthFactory = authType => (state, action) => {
  if (!action.payload) return state.delete(authType)
  return state.set(authType, action.payload)
}

const clearAuth = state => state.clear()

const tokens = createReducer(fromJS({}), {
  [constants.SET_AUTHENTICATION]: setAuthFactory('authn'),
  [constants.SET_AUTHORIZATION]: setAuthFactory('authz'),
  [constants.CLEAR_AUTH]: clearAuth,
})

export default {
  tokens,
}
