import {
  MEETING_CREATE_START,
  MEETING_CREATE_FAILED,
  MEETING_CREATE_SUCCEEDED,
} from '../actions/actionTypes'

const initialState = false

const ajax = (state = initialState, action = {}) => {
  switch (action.type) {
  case MEETING_CREATE_START: {
    return true
  }
  case MEETING_CREATE_FAILED:
  case MEETING_CREATE_SUCCEEDED: {
    return false
  }
  default: {
    return state
  }
  }
}

export default ajax
