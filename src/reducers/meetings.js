import { fromJS } from 'immutable'

import { createReducer } from './reducer-utilities'

import * as constants from '../constants'

const entityStateFactory = () => fromJS({ entities: {}, result: [] })

const createEntityReducer = handlers => createReducer(entityStateFactory(), handlers)

const entityUpdateFactory = (entity) => {
  return (state, action) => {
    const { entities, result } = action.payload[entity]
    return state
    .update('entities', map => map.mergeDeep(entities))
    .update('result', list => list.toOrderedSet().concat(result).toList())
  }
}

const meetings = createEntityReducer({
  [constants.RECEIVE_MEETINGS]: entityUpdateFactory('meetings'),
})

const rooms = createEntityReducer({
  [constants.RECEIVE_ROOMS]: entityUpdateFactory('rooms'),
})

const participants = createEntityReducer({
  [constants.RECEIVE_MEETINGS]: entityUpdateFactory('participants'),
})

export default {
  meetings,
  rooms,
  participants,
}
