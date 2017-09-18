import * as selectors from './tokens'

import stateFixture from '../../__fixtures__/stateFixture'

describe('selectors', () => {

  const globalState = { ...stateFixture }

  describe('tokens', () => {
    const state = { tokens: globalState.tokens }

    it('#getTokens(state)', () => {
      const tokens = selectors.getTokens(state)
      expect(tokens).toBeTruthy()

      expect(selectors.getAuthenticationToken(state)).toEqual(globalState.tokens.get('authn'))  // eslint-disable-line
      // console.log(authn)
      const authz = selectors.getAuthorizationToken(state)  // eslint-disable-line
      // console.log(authz)

      selectors.getAuthenticationToken(state)
      // console.log(selectors.getAuthenticationToken.recomputations())

      // console.dir(data, { depth: null })
      // expect(data).toBeTruthy()
    })
  })


})
