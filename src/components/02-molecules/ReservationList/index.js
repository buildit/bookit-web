import React from 'react'
import PropTypes from 'prop-types'

import momentPropTypes from 'react-moment-proptypes'

import styles from './styles.scss'

const ReservationList = ({ meetings = [], handleEditClick }) => (
  <div className={styles.reservationList}>
    <h2 className={styles.header}>{meetings.length > 0 ? 'My Reservations' : ''}</h2>
    {meetings.map(meeting => (
      <div className={styles.meeting} key={meeting.id}>
        <div className={styles.info}>
          <div className={styles.title}>{meeting.title}</div>
          <div className={styles.time}>{meeting.start.format('h:mma')} - {meeting.end.format('h:mma')}</div>
          <div className={styles.room}>{`${meeting.roomName} Room`}</div>
        </div>
        <div
          onClick={() => {
            handleEditClick(meeting)
          }}
          className={styles.button}
        >Edit</div>
      </div>
    ))}
  </div>
)

ReservationList.propTypes = {
  handleEditClick: PropTypes.func.isRequired,
  meetings: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      start: momentPropTypes.momentObj.isRequired,
      end: momentPropTypes.momentObj.isRequired,
      duration: PropTypes.number.isRequired,
      owner: PropTypes.shape({
        name: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
      }).isRequired,
      roomName: PropTypes.string.isRequired,
      roomId: PropTypes.string.isRequired,
    })
  ),
}

export default ReservationList
