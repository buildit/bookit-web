import isemail from 'isemail'

export const validate = (values) => {
  const errors = {}

  if (!values.email) {
    errors.email = 'Email is required'
  }

  if (values.email && !isemail.validate(values.email)) {
    errors.email = 'Email is invalid'
  }

  return errors
}
