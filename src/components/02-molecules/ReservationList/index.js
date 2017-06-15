import React from 'react'
import PropTypes from 'prop-types'

import momentPropTypes from 'react-moment-proptypes'

import ReservationItem from './ReservationItem'
// import Button from '../../01-atoms/Button'

import styles from './styles.scss'

const ReservationList = ({ meetings = [], handleEditClick }) => (
  <div className={styles.reservationList}>
    <h2 className={styles.header}>{meetings.length > 0 ? 'My Reservations' : ''}</h2>
    {meetings.map(meeting => (
      <ReservationItem key={meeting.id} styles={styles} meeting={meeting} onClick={() => handleEditClick(meeting)} />
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
