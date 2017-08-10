import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import MomentPropTypes from 'react-moment-proptypes'

const ReservationItem = ({ styles, meeting, onClick }) => {
  const now = moment()
  const isEditable = meeting.end.isAfter(now)
  return (
  <div className={styles.meeting}>
    <div className={styles.info}>
      <div className={styles.title}>
        {meeting.title}
      </div>
      <div className={styles.time}>
        {meeting.start.format('h:mma')} - {meeting.end.format('h:mma')}
      </div>
      <div className={styles.room}>
        {meeting.roomName} Room
      </div>
    </div>
    {/* THIS SHOULD BE A Button COMPONENT! */}
    {isEditable ? <div onClick={onClick} className={styles.button}>Edit</div> : ''}
  </div>
  )}

ReservationItem.propTypes = {
  styles: PropTypes.object,
  meeting: PropTypes.shape({
    title: PropTypes.string,
    start: MomentPropTypes.momentObj,
    end: MomentPropTypes.momentObj,
    roomName: PropTypes.string,
  }),
  onClick: PropTypes.func.isRequired,
}

export default ReservationItem
