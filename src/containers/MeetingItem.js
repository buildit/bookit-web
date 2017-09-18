import React from 'react'
import PropTypes from 'prop-types'

import Moment from 'moment'

const formatTime = dateString => Moment(dateString).format('h:mma')
const formatDate = dateString => Moment(dateString).format('MM/DD/YYYY')
const toDuration = (start, end) => Moment.duration(Moment(end).diff(start, 'seconds'), 'seconds').humanize()

const baseStyle = {
  backgroundColor: 'plum',
  marginBottom: '10px',
  padding: '20px',
}

const meetingOwnerStyle = {
  ...baseStyle,
  backgroundColor: 'goldenrod',
}

export const MeetingItem = ({ title, start, end, roomName, isUserMeetingOwner, isMeetingEditable, isMeetingInThePast, isMeetingHappeningNow, isMeetingInTheFuture }) => (
  <div style={isUserMeetingOwner ? meetingOwnerStyle : baseStyle }>
    <h2>{ title }</h2>
    <p>{ formatDate(start) } - { formatTime(start) } - { formatTime(end) } ({ toDuration(start, end) })</p>
    <p>{ roomName } Room</p>
    { isMeetingEditable &&
      <button type="button">EDIT</button>
    }
    <pre>
    isMeetingInThePast: { isMeetingInThePast ? 'true' : 'false' }
    { ' ' }
    isMeetingHappeningNow: { isMeetingHappeningNow ? 'true' : 'false' }
    { ' ' }
    isMeetingInTheFuture: { isMeetingInTheFuture ? 'true' : 'false' }
    </pre>
  </div>
)

MeetingItem.propTypes = {
  title: PropTypes.string,
  start: PropTypes.string,
  end: PropTypes.string,
  roomName: PropTypes.string,
  isUserMeetingOwner: PropTypes.bool,
  isMeetingEditable: PropTypes.bool,
  isMeetingInThePast: PropTypes.bool,
  isMeetingHappeningNow: PropTypes.bool,
  isMeetingInTheFuture: PropTypes.bool,
}

// -> { id, title, start, end, room, owner } => { isMeetingInPast, isMeetingInFuture, isHappeningNow, isUserMeetingOwner, isUserAdmin }
// * isMeetingEditable => { (isMeetingInFuture || isHappeningNow) && (isUserMeetingOwner || isUserAdmin) }

export default MeetingItem
