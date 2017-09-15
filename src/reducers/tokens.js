import { fromJS } from 'immutable'

import { createReducer } from './reducer-utilities'

import * as constants from '../constants'

const setAuthFactory = authType => (state, action) => state.set(authType, action.payload)

const clearAuth = state => state.clear()

const tokens = createReducer(fromJS({}), {
  [constants.SET_AUTHENTICATION]: setAuthFactory('authn'),
  [constants.SET_AUTHORIZATION]: setAuthFactory('authz'),
  [constants.CLEAR_AUTH]: clearAuth,
})

export default {
  tokens,
}
