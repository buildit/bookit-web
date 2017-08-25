import { fromJS } from 'immutable'

import moment from 'moment'

import * as actions from '../actions'

const selectedMeeting = (state = null, action) => {
  switch(action.type) {
  case actions.SELECT_MEETING:
    return action.payload
  case actions.SELECT_DATE:
    return null
  }
  return state
}

const selectedDate = (state = moment().format('YYYY-MM-DD'), action) => {
  switch(action.type) {
  case actions.SELECT_DATE:
    return action.payload
  }
  return state
}

const meetings = (state = fromJS({ entities: {}, result: [] }), action) => {
  switch(action.type) {
  case actions.RECEIVE_MEETINGS:
    return state.mergeDeep(action.payload.meetings)
  }
  return state
}

const participants = (state = fromJS({ entities: {}, result: [] }), action) => {
  switch(action.type) {
  case actions.RECEIVE_MEETINGS:
    return state.mergeDeep(action.payload.participants)
  }
  return state
}

const rooms = (state = fromJS({ entities: {}, result: [] }), action) => {
  switch(action.type) {
  case actions.RECEIVE_MEETINGS:
    return state.mergeDeep(action.payload.rooms)
  }
  return state
}

export default {
  selectedMeeting,
  selectedDate,
  meetings,
  rooms,
  participants,
}
