import moment from 'moment'

export const mapInitialValues = (values, isQuickBooking) => {
  console.log(isQuickBooking)
  if (isQuickBooking) {
    return {
      start: moment(),
      end: moment().add(1, 'hour'),
    }
  }
  return {
    id: values.id,
    title: values.title,
    start: values.start && moment(values.start).toDate(),
    end: values.end && moment(values.end).toDate(),
    room: values.room.email,
  }
}
