import React from 'react'
import PropTypes from 'prop-types'

import moment from 'moment'

const formatDate = dateString => moment(dateString).format('h:mma')

const style = {
  backgroundColor: 'goldenrod',
  marginBottom: '10px',
  padding: '20px',
}

const MeetingItem = props => (
  <div style={props.style || style}>
    <h2>{ props.title }</h2>
    <p>{ formatDate(props.start) } - { formatDate(props.end) }</p>
    <p>{ props.room } Room</p>
    <button onClick={props.onClick}>Edit</button>
  </div>
)

MeetingItem.propTypes = {
  title: PropTypes.string,
  start: PropTypes.string,
  end: PropTypes.string,
  room: PropTypes.string,
  style: PropTypes.object,
  onClick: PropTypes.func,
}

export default MeetingItem
