import { Map, List, fromJS, is } from 'immutable'

import reducers from './meetings'

import * as actions from '../actionCreators'

// meetings,
// rooms,
// participants,

describe('meetings reducers', () => {

  const payload = {
    entities: {
      'xyz': { id: 'xyz', title: 'first meeting' },
      'abc': { id: 'abc', title: 'second meeting' },
    },
    result: [ 'xyz', 'abc' ],
  }

  describe('#meetings(state, action)', () => {
    it('has an initial immutable state', () => {
      const state = reducers.meetings(undefined, {})
      console.dir(state.toJS(), { depth: null })

      expect(state.has('entities')).toBeTruthy()
      expect(Map.isMap(state.get('entities'))).toBeTruthy()

      expect(state.has('result')).toBeTruthy()
      expect(List.isList(state.get('result'))).toBeTruthy()
    })

    it('returns new state when `RECEIVE_MEETINGS` action type has been dispatched', () => {
      const action = actions.receiveMeetings({ meetings: payload })
      const state = reducers.meetings(undefined, action)
      const expected = fromJS(payload)

      expect(is(state, expected)).toBeTruthy()
    })

    it('deeply merges payload into existing state', () => {
      const updatePayload = {
        entities: {
          'qpr': { id: 'qpr', title: 'third meeting' },
        },
        result: [ 'qpr' ],
      }

      const expected = fromJS({
        entities: {
          'xyz': { id: 'xyz', title: 'first meeting' },
          'qpr': { id: 'qpr', title: 'third meeting' },
          'abc': { id: 'abc', title: 'second meeting' },
        },
        result: [ 'xyz', 'abc', 'qpr' ],
      })

      const action = actions.receiveMeetings({ meetings: updatePayload })
      const state = reducers.meetings(fromJS(payload), action)
      expect(is(state, expected)).toBeTruthy()
    })
    // const meetings = (state = fromJS({ entities: {}, result: [] }), action) => {
    //   switch(action.type) {
    //   case constants.RECEIVE_MEETINGS:
    //     return state.mergeDeep(action.payload.meetings)
    //   }
    //   return state
    // }
  })

  // describe('#rooms(state, action)', () => {
  //   it('does a thing', () => {

  //   })
  // })

  // describe('#participants(state, action)', () => {
  //   it('does a thing', () => {

  //   })
  // })

})
