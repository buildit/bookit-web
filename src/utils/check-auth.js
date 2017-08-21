import { setClient } from '../actions'

/**
 * Ehhhhhhhhhhhhhh... Needs a little more cleanup, but in general
 * we kinda dumbly trust a user from localStorage if there is no user
 * in state.
 *
 * It is entirely possible that I suck at branching logic
 */

export const isUser = user => user.email && user.token
export const isAdmin = user => isUser(user) && user.isAdmin

const checkStoredAuthorization = (dispatch, verifyUser) => {
  const storedUser = localStorage.getItem('user')

  if (storedUser) {
    const user = JSON.parse(storedUser)

    // We need a better system here to verify a user from localStorage
    // is who they say they are, and additionally verify the JWT token

    // const created = Math.round(createdDate.getTime() / 1000)
    // const ttl = 1209600
    // const expiry = created + ttl

    // if the user has expired return false
    // if (created > expiry) return false

    dispatch(setClient(user))
    return verifyUser(user)
  }

  return false
}

export function isAuthorizedUser(user, dispatch) {
  if (!isUser(user))
    return checkStoredAuthorization(dispatch, isUser)
  return true
}

export function isAuthorizedAdmin(user, dispatch) {
  if (!isUser(user))
    return checkStoredAuthorization(dispatch, isAdmin)
  return isAdmin(user)
}
