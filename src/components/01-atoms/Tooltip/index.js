import React, { PropTypes } from 'react';

import moment from 'moment';

import styles from './styles.scss';

import calculateTooltipOffset from '../../../utils/calculateTooltipOffset';

const Tooltip = ({ title, startTime, duration, roomTitle, isOwnedByUser, owner = {}, visible }) => {
  const style = {
    display: visible ? 'block' : 'none',
    left: calculateTooltipOffset(duration),
  };

  const meetingStartTime = moment(startTime);
  const meetingEndTime = meetingStartTime.clone().add(duration, 'hours');

  return (<div className={styles.tooltip} style={style}>
    <div className={styles.anchor} />
    <div className={styles.content}>
      <p>
        <strong>{ title }</strong>
        { meetingStartTime.format('h:00a') } - { meetingEndTime.format('h:00a') }
      </p>
      <p>
        <strong>{ roomTitle } Room</strong>
        by { isOwnedByUser ? 'me' : owner.name }
      </p>
    </div>
  </div>);
};

Tooltip.propTypes = {
  title: PropTypes.string,
  startTime: PropTypes.string,
  roomTitle: PropTypes.string,
  isOwnedByUser: PropTypes.bool,
  owner: PropTypes.shape,
  visible: PropTypes.bool,
  duration: PropTypes.number.isRequired,
};

export default Tooltip;
