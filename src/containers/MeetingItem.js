import React from 'react'
import PropTypes from 'prop-types'

import moment from 'moment'

const formatTime = dateString => moment(dateString).format('h:mma')
const formatDate = dateString => moment(dateString).format('MM/DD/YYYY')
const toDuration = (start, end) => moment.duration(moment(end).diff(start, 'seconds'), 'seconds').humanize()

const baseStyle = {
  backgroundColor: 'plum',
  marginBottom: '10px',
  padding: '20px',
}

const meetingOwnerStyle = {
  ...baseStyle,
  backgroundColor: 'goldenrod',
}

export const MeetingItem = ({ title, start, end, roomName, isUserMeetingOwner }) => (
  <div style={isUserMeetingOwner ? meetingOwnerStyle : baseStyle }>
    <h2>{ title }</h2>
    <p>{ formatDate(start) } - { formatTime(start) } - { formatTime(end) } ({ toDuration(start, end) })</p>
    <p>{ roomName } Room</p>
  </div>
)

MeetingItem.propTypes = {
  title: PropTypes.string,
  start: PropTypes.string,
  end: PropTypes.string,
  roomName: PropTypes.string,
  isUserMeetingOwner: PropTypes.bool,
}

// -> { id, title, start, end, room, owner } => { isMeetingInPast, isMeetingInFuture, isHappeningNow, isUserMeetingOwner, isUserAdmin }
// * isMeetingEditable => { (isMeetingInFuture || isHappeningNow) && (isUserMeetingOwner || isUserAdmin) }

export default MeetingItem
