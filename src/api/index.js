import { authorize, fetchRooms, fetchMeetings } from './api'
import { storeAuthentication, getAuthentication, clearAuthentication } from './storage'

export default {
  authorize,
  fetchRooms,
  fetchMeetings,
  storeAuthentication,
  getAuthentication,
  clearAuthentication,
}
