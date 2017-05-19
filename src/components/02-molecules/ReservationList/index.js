import React, { PropTypes } from 'react';
import styles from './styles.scss';

const ReservationList = ({ meetings = [] }) => (
  <div className={styles.reservationList}>
    {meetings.map(meeting => (
      <div>hey this will be a meeting</div>
    ))}
  </div>
);

ReservationList.propTypes = {
  meetings: PropTypes.arrayOf(PropTypes.shape()),
};

export default ReservationList;
