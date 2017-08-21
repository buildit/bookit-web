import React from 'react'
import PropTypes from 'prop-types'

import ErrorMessage from '../../01-atoms/ErrorMessage'

const ErrorMessages = ({ errors = {} }) => (
  <div>
    {
      Object.keys(errors).map(error => (
        <ErrorMessage key={error} message={errors[error]} />
      ))
    }
  </div>
)

export default ErrorMessages

ErrorMessages.propTypes = {
  errors: PropTypes.shape(({})),
}
