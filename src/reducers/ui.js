import Moment from 'moment'

import { fromJS } from 'immutable'

import { createReducer } from './reducer-utilities'

import * as constants from '../constants'

const dateFactory = (date = undefined, amount = 0, type = 'days') => Moment(date).add(amount, type).format('YYYY-MM-DD')

const selectDate = (state, action) => dateFactory(action.payload)
const selectDateFactory = (amount = 0, type = 'days') => state => dateFactory(state, amount, type)

const selectedDate = createReducer(dateFactory(), {
  [constants.SELECT_DATE]: selectDate,
  [constants.INCREMENT_DATE]: selectDateFactory(1),
  [constants.DECREMENT_DATE]: selectDateFactory(-1),
})

const setLoggedInFactory = loggedIn => state => state.set('loggedIn', loggedIn)

const flags = createReducer(fromJS({ loggedIn: false }), {
  [constants.LOGIN_SUCCESS]: setLoggedInFactory(true),
  [constants.LOGOUT_SUCCESS]: setLoggedInFactory(false),
})

export default {
  selectedDate,
  ui: flags,
}
