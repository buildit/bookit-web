import isMeetingOnDate from '../utils/isMeetingOnDate'

export const getMeetings = state => state.app.allMeetingIds
    .map(id => state.app.meetingsById[id])
    .filter(meeting => isMeetingOnDate(meeting, state.app.selectedDate))
    .map(meeting => ({
      ...meeting,
      isOwnedByUser: meeting.owner.email === state.user.email }))


export const getMessages = state => state.app.messages

export const getSelectedDate = state => state.app.selectedDate

export const getUserToBeRemoved = state => state.app.userToBeRemoved
