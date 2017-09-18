import Agent from 'superagent'

import Moment from 'moment'

const baseApiUrl = 'http://localhost:8888'

const makeUrl = path => `${baseApiUrl}${path}`

export const authorize = code => Agent
  .post(makeUrl('/authenticate'))
  .send({ code })
  .then(response => response.body)

export const fetchRooms = () => Agent
  .get(makeUrl('/rooms/nyc'))
  .then(response => response.body)

export const fetchMeetings = (token, date) => {
  const end = Moment(date).add(1, 'day').format('YYYY-MM-DD')

  const request = Agent
    .get(makeUrl(`/rooms/nyc/meetings?start=${date}&end=${end}`))

  token && request.set('x-access-token', token)

  return request.then(response => response.body)
}
