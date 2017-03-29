import React, { PropTypes } from 'react';
import styles from './styles.scss';

const calculateWidth = (duration) => {
  const width = (100 * duration) - 3;
  return width;
};

const calculateLeft = (hoursFromBeginningOfDay) => {
  const left = 100 * hoursFromBeginningOfDay;
  return left;
};

const Meeting = ({ isOwnedByUser, duration = 0, hoursFromBeginningOfDay }) => {
  const width = calculateWidth(duration);
  const left = calculateLeft(hoursFromBeginningOfDay);

  const calculatedStyles = {
    width,
    left,
  };

  if (isOwnedByUser) {
    return (<div
      className={`${styles.meeting} ${styles.isOwnedByUser}`}
      style={calculatedStyles}
    >
      <i />
    </div>
    );
  }
  return (<div
    className={styles.meeting}
    style={calculatedStyles}
  />);
};

Meeting.propTypes = {
  isOwnedByUser: PropTypes.bool,
  duration: PropTypes.number.isRequired,
  hoursFromBeginningOfDay: PropTypes.number,
};

export default Meeting;
