import PropTypes from 'prop-types'


const USER_SHAPE = PropTypes.shape({
  name: PropTypes.string.isRequired,
  isAdmin: PropTypes.bool,
})

export default USER_SHAPE
