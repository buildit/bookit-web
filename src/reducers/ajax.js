import {
  MEETING_UPSERT_START,
  MEETING_UPSERT_FAILED,
  MEETING_UPSERT_SUCCEEDED,
} from '../actions/actionTypes'

const initialState = false

const ajax = (state = initialState, action = {}) => {
  switch (action.type) {
  case MEETING_UPSERT_START: {
    return true
  }
  case MEETING_UPSERT_FAILED:
  case MEETING_UPSERT_SUCCEEDED: {
    return false
  }
  default: {
    return state
  }
  }
}

export default ajax
