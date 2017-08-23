import React from 'react'
import PropTypes from 'prop-types'

const style = {
  backgroundColor: 'purple',
  marginBottom: '10px',
  padding: '20px',
}

export const RoomItem = ({ name, email }) => (
  <div style={style}>
    <h2>{ name } Room</h2>
    <p>({ email })</p>
  </div>
)

RoomItem.propTypes = {
  name: PropTypes.string,
  email: PropTypes.string,
}

export default RoomItem
