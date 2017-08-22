import { fromJS } from 'immutable'

import moment from 'moment'

import {
  SELECT_DATE,
  RECEIVE_DATA,
} from '../actions'

const selectedDate = (state = moment().format('YYYY-MM-DD'), action) => {
  switch(action.type) {
  case SELECT_DATE:
    return action.date
  default:
    return state
  }
}

const meetings = (state = fromJS({ entities: {}, result: [] }), action) => {
  switch(action.type) {
  case RECEIVE_DATA:
    return state.mergeDeep(action.data.meetings)
  }
  return state
}

const participants = (state = fromJS({ entities: {}, result: [] }), action) => {
  switch(action.type) {
  case RECEIVE_DATA:
    return state.mergeDeep(action.data.participants)
  }
  return state
}

const rooms = (state = fromJS({ entities: {}, result: [] }), action) => {
  switch(action.type) {
  case RECEIVE_DATA:
    return state.mergeDeep(action.data.rooms)
  }
  return state
}

export default {
  selectedDate,
  meetings,
  rooms,
  participants,
}
