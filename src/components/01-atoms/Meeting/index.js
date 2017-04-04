import React, { PropTypes } from 'react';

import moment from 'moment';

import styles from './styles.scss';

const WIDTH = 82;

const calculateWidth = (duration) => (WIDTH * duration) - 2;

const calculateOffset = (startTime) => {
  if (startTime === undefined) return 0;
  try {
    const startTimeObj = moment(startTime);
    return (WIDTH * (startTimeObj.hour() + (startTimeObj.minutes() / 60)));
  } catch (e) {
    return false;
  }
};

const Meeting = ({ isOwnedByUser, startTime, duration = 0 }) => {
  const classNames = [styles.meeting];

  if (isOwnedByUser) {
    classNames.push(styles.isOwnedByUser);
  }

  const style = {
    width: calculateWidth(duration),
    left: calculateOffset(startTime),
  };

  return (<div className={classNames.join(' ')} style={style}><i /></div>);
};

Meeting.propTypes = {
  isOwnedByUser: PropTypes.bool,
  duration: PropTypes.number.isRequired,
  startTime: PropTypes.string,
};

export default Meeting;
