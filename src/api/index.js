import { authorize, fetchRooms, fetchMeetings } from './api'
import { authenticationRedirectUrl, signinRequestUrl, refreshRequestUrl } from './azure'
import { storeAuthentication, getAuthentication, clearAuthentication } from './storage'

export default {
  authorize,
  fetchRooms,
  fetchMeetings,
  authenticationRedirectUrl,
  signinRequestUrl,
  refreshRequestUrl,
  storeAuthentication,
  getAuthentication,
  clearAuthentication,
}
