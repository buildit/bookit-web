import React from 'react'
import PropTypes from 'prop-types'

import moment from 'moment'

const formatDate = dateString => moment(dateString).format('h:mma')

const style = {
  backgroundColor: 'goldenrod',
  marginBottom: '10px',
  padding: '20px',
}

export const MeetingItem = ({ title, start, end, roomName }) => (
  <div style={style}>
    <h2>{ title }</h2>
    <p>{ formatDate(start) } - { formatDate(end) }</p>
    <p>{ roomName } Room</p>
  </div>
)

MeetingItem.propTypes = {
  title: PropTypes.string,
  start: PropTypes.string,
  end: PropTypes.string,
  roomName: PropTypes.string,
}

// -> { id, title, start, end, room, owner } => { isMeetingInPast, isMeetingInFuture, isHappeningNow, isUserMeetingOwner, isUserAdmin }
// * isMeetingEditable => { (isMeetingInFuture || isHappeningNow) && (isUserMeetingOwner || isUserAdmin) }

export default MeetingItem
