import Agent from 'superagent'
import Moment from 'moment'

const baseApiUrl = 'http://localhost:8888'

const makeUrl = path => `${baseApiUrl}${path}`

const authorize = code => Agent
  .post(makeUrl('/authenticate'))
  .send({ code })
  .then(response => response.body)

const fetchRooms = () => Agent
  .get(makeUrl('/rooms/nyc'))
  .then(response => response.body)

const fetchMeetings = (token, date) => {
  const end = Moment(date).add(1, 'day').format('YYYY-MM-DD')

  const request = Agent
    .get(makeUrl(`/rooms/nyc/meetings?start=${date}&end=${end}`))

  token && request.set('x-access-token', token)

  return request.then(response => response.body)
}

const STORE_KEY_PREFIX = '_bookit'

const makeStoreKey = key => `${STORE_KEY_PREFIX}|${key}`

export const storeItem = (key, item) => {
  localStorage.setItem(makeStoreKey(key), JSON.stringify(item))
}

export const getItem = (key) => {
  const result = localStorage.getItem(makeStoreKey(key))
  return result ? JSON.parse(result) : null
}

export const getItems = (...items) => items.reduce((out, key) => ({ ...out, [key]: localStorage.getItem(makeStoreKey(key)) }), {})

export const clearItem = (...items) => {
  for (const key of items) {
    localStorage.removeItem(makeStoreKey(key))
  }
}

export const storeAuthentication = authn => storeItem('authn', authn)
export const getAuthentication = () => getItem('authn')
export const clearAuthentication = () => clearItem('authn')

export default {
  authorize,
  fetchRooms,
  fetchMeetings,
  storeAuthentication,
  getAuthentication,
  clearAuthentication,
}
