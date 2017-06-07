import { setClient } from '../actions'

function checkStoredAuthorization(dispatch) {
  const storedUser = localStorage.getItem('user')

  if (storedUser) {
    const user = JSON.parse(storedUser)
    // const created = Math.round(createdDate.getTime() / 1000)
    // const ttl = 1209600
    // const expiry = created + ttl

    // if the user has expired return false
    // if (created > expiry) return false

    dispatch(setClient(user))
    return true
  }

  return false
}

export function isAuthorizedUser(user, dispatch) {
  if (!user.token && !user.id && !user.email)
    return checkStoredAuthorization(dispatch)
  return (user.token && user.id && user.email)
}

export function isAuthorizedAdmin(user, dispatch) {
  return isAuthorizedUser(user, dispatch) && (user.id === 1 || user.id === 3)
}
