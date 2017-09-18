import { createGetSelector } from 'reselect-immutable-helpers'

export const getUser = state => state.user

export const getUserName = createGetSelector(getUser, 'name', null)
export const getUserEmail = createGetSelector(getUser, 'email', null)
export const getUserId = createGetSelector(getUser, 'id', null)
export const isUserAdmin = createGetSelector(getUser, 'isAdmin', false)
