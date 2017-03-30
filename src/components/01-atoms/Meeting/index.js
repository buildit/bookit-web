import React, { PropTypes } from 'react';

import moment from 'moment';

import styles from './styles.scss';

const WIDTH = 82;

const calculateWidth = duration => (WIDTH * duration) - 2;

const calculateOffset = (startTime) => {
  if (startTime === undefined) return 0;
  const startTimeObj = moment(startTime);
  return (WIDTH * (startTimeObj.hour() + (startTimeObj.minutes() / 60)));
};

const Meeting = ({ isOwnedByUser, duration = 0, startTime }) => {
  const width = calculateWidth(duration);
  const left = calculateOffset(startTime);

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
  startTime: PropTypes.string,
};

export default Meeting;
