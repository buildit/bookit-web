import { fromJS } from 'immutable'

import { createReducer } from './reducer-utilities'

import * as constants from '../constants'

const setUser = (state, action) => state.merge(action.payload)
const clearUser = state => state.clear()

const user = createReducer(fromJS({}), {
  [constants.SET_USER]: setUser,
  [constants.CLEAR_USER]: clearUser,
})

export default {
  user,
}
