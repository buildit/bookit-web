import React from 'react'
import PropTypes from 'prop-types'

import MomentPropTypes from 'react-moment-proptypes'

const ReservationItem = ({ styles, meeting, onClick }) => (
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
    <div onClick={onClick} className={styles.button}>Edit</div>
  </div>
)

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
