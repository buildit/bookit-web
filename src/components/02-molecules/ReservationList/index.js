import React, { PropTypes } from 'react';
import styles from './styles.scss';

const ReservationList = ({ meetings = [1] }) => (
  <div className={styles.reservationList}>
    {meetings.map(meeting => (
      <div className={styles.meeting}>
        <div className={styles.info}>
          <div className={styles.title}>Lunch and Learn with Batman</div>
          <div className={styles.time}>3:00pm - 4:00pm</div>
          <div className={styles.room}>Black Room</div>
        </div>
        <div
          onClick={() => console.log('Use our new populateMeetingEditForm action')}
          className={styles.button}
        >Edit</div>
      </div>
    ))}
  </div>
);

ReservationList.propTypes = {
  meetings: PropTypes.arrayOf(PropTypes.shape()),
};

export default ReservationList;
