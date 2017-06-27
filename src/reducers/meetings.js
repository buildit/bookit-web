import { fromJS } from 'immutable'

const initialState = fromJS({
  entities: {
    users: {},
    meetings: {},
    rooms: {},
  },
  result: [],
})

const reducer = (state = initialState, action) => {
  switch(action.type) {
  case 'MEETINGS_FETCHED':
    return state.mergeDeep(action.payload)
  }
  return state
}

export default reducer
