export const getUser = state => state.user

export const getUsers = state => state.users

export const getUserToken = state => getUser(state).token
