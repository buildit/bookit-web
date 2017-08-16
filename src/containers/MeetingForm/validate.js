import moment from 'moment'

// Validation functions

// Field level validators
export const required = value => (value ? undefined : 'Required')

// Form level validator
export const validate = (values) => {
  const errors = {}

  if (values.task === 'dawg') {
    errors.task = 'No dawgs allowed'
  }

  if (moment(values.start).isSameOrAfter(moment(values.end))) {
    // errors.start = 'Start date must be before end date'
    errors.end = 'Start date must be before end date'
  }

  return errors
}
