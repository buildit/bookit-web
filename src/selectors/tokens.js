import { createSelector } from 'reselect'
import { createGetSelector, createHasSelector } from 'reselect-immutable-helpers'

export const getTokens = state => state.tokens

export const getAuthenticationToken = createGetSelector(getTokens, 'authn', null)
export const getAuthorizationToken = createGetSelector(getTokens, 'authz', null)

export const hasAuthenticationToken = createHasSelector(getTokens, 'authn')
export const hasAuthorizationToken = createHasSelector(getTokens, 'authz')

export const isLoggedIn = createSelector(
  [ hasAuthorizationToken, hasAuthenticationToken ],
  (hasAuthorization, hasAuthentication) => hasAuthorization && hasAuthentication
)
