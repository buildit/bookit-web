import { fromJS } from 'immutable'

import Moment from 'moment'

import * as constants from '../constants'

const mutateDate = (date, amount = 0, type = 'days') => Moment(date).add(amount, type).format('YYYY-MM-DD')

const selectedDate = (state = Moment().format('YYYY-MM-DD'), action) => {
  switch(action.type) {
  case constants.SELECT_DATE:
    return mutateDate(action.payload)
  case constants.INCREMENT_DATE:
    return mutateDate(state, 1)
  case constants.DECREMENT_DATE:
    return mutateDate(state, -1)
  }
  return state
}

const meetings = (state = fromJS({ entities: {}, result: [] }), action) => {
  switch(action.type) {
  case constants.RECEIVE_MEETINGS:
    return state.mergeDeep(action.payload.meetings)
  }
  return state
}

const participants = (state = fromJS({ entities: {}, result: [] }), action) => {
  switch(action.type) {
  case constants.RECEIVE_MEETINGS:
    return state.mergeDeep(action.payload.participants)
  }
  return state
}

const rooms = (state = fromJS({ entities: {}, result: [] }), action) => {
  switch(action.type) {
  case constants.RECEIVE_ROOMS:
    return state.mergeDeep(action.payload.rooms)
  }
  return state
}

export default {
  selectedDate,
  meetings,
  rooms,
  participants,
}
