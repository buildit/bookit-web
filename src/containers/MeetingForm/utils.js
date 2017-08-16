import moment from 'moment'

export const mapInitialValues = values => ({
  id: values.id,
  title: values.title,
  start: values.start && moment(values.start).toDate(),
  end: values.end && moment(values.end).toDate(),
  room: values.room.email,
})
