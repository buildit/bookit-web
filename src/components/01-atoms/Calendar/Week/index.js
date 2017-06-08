import React from 'react'
import PropTypes from 'prop-types'

import Day from '../Day'

const Week = ({ week }) => (
  <div>
    {week.map((day, index) => <Day key={index} day={day} />)}
  </div>
)

Week.propTypes = {
  week: PropTypes.arrayOf(PropTypes.object),
}

export default Week
