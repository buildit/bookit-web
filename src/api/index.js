import { login } from './auth'
import { fetchMeetings, createMeeting, editMeeting, cancelMeeting } from './meetings'
import { addUser, listUsers } from './users'
import { getOpenIdUrl } from './auth'

const Api = {
  login,
  fetchMeetings,
  createMeeting,
  editMeeting,
  cancelMeeting,
  addUser,
  listUsers,
  getOpenIdUrl,
}

export default Api
