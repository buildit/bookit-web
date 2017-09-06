export const getRequestedMeeting = state => state.app.requestedMeeting

export const getRequestedMeetingRoom = state => getRequestedMeeting(state).room

export const getRequestedMeetingId = state => getRequestedMeeting(state).id
