export const getUser = state => state.user

export const getUserToken = state => getUser(state).token
