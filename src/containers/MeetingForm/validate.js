import moment from 'moment'

export const validate = (values) => {
  const errors = {}

  if (!values.title) {
    errors.title = 'Event Name is required'
  }

  if (moment(values.start).isSameOrAfter(moment(values.end))) {
    errors.time = 'Start date must be before end date'
  }

  if (!values.room) {
    errors.room = 'Room is required'
  }

  return errors
}
