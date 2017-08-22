import moment from 'moment'

export const mapInitialValues = (state) => {
  const { app: { requestedMeeting, isQuickCreatingMeeting } } = state
  const values = { ...requestedMeeting }

  if (isQuickCreatingMeeting) {
    return {
      start: moment(),
      end: moment().add(1, 'hour'),
    }
  }

  return {
    id: values.id,
    title: values.title,
    start: values.start,
    end: values.end,
    room: values.room.email,
  }
}
