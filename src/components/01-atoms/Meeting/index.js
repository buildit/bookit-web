import React, { PropTypes } from 'react';
import styles from './styles.scss';

const calculateWidth = (duration) => {
  const width = 100 * duration;
  return width;
};

const Meeting = ({ isOwnedByUser, duration = 0 }) => {
  const width = calculateWidth(duration);

  const calculatedStyles = {
    width,
  };

  if (isOwnedByUser) {
    return (<div
      className={`${styles.meeting} ${styles.isOwnedByUser}`}
      style={calculatedStyles}
    />);
  }
  return (<div
    className={styles.meeting}
    style={calculatedStyles}
  />);
};

Meeting.propTypes = {
  isOwnedByUser: PropTypes.bool,
  duration: PropTypes.number.isRequired,
};

export default Meeting;
