import agent from 'superagent'

import { apiBaseUrl } from './utils'

export const addUser = (user, token) => agent
  .post(`${apiBaseUrl}/users`)
  .set('x-access-token', token)
  .send(user)
  .then((response) => {
    const user = JSON.parse(response.text)
    return user
  })

export const listUsers = token => agent
  .get(`${apiBaseUrl}/users`)
  .set('x-access-token', token)
  .then((response) => {
    const users = JSON.parse(response.text)
    return users
  })
