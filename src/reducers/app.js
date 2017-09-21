import Moment from 'moment'

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

// TODO: Make this piece of state temporary - or roll it into the
// "generic" app/ui state which will include things like
// `requestStarted`, `requestPending`, `requestEnded`, `requestFailed`
// etc.
const needsAuthRefresh = createReducer(false, {
  [constants.REFRESH_AUTH_REQUEST]: () => true,
  [constants.REFRESH_AUTH_SUCCESS]: () => false,
})

export default {
  selectedDate,
  needsAuthRefresh,
}
