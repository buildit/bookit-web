import { createSelector } from 'reselect'

export const getRouter = state => state.router

export const getRouterLocation = createSelector(
  [ getRouter ],
  router => router.location
)
