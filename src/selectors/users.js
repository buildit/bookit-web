export const getUser = state => state.user

export const getUserToken = state => getUser(state).token

export const getUsers = state => state.users
