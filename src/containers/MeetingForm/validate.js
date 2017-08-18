import moment from 'moment'

export const validate = (values) => {
  const errors = {}

  if (!values.title) {
    errors.title = 'Name is required'
  }

  if (moment(values.start).isSameOrAfter(moment(values.end))) {
    errors.end = 'Start date must be before end date'
  }

  return errors
}
