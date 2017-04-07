import React, { PropTypes } from 'react';

import moment from 'moment';

import styles from './styles.scss';

import calculateTooltipOffset from '../../../utils/calculateTooltipOffset';

const Tooltip = ({
  tooltipOffset, title, startTime, duration, roomTitle, isOwnedByUser, owner, visible,
}) => {
  const style = {
    display: 'block',
    opacity: visible ? 1 : 0,
    left: visible ? calculateTooltipOffset(duration) : -99999,
  };

  const tooltipStyle = {
    left: tooltipOffset,
  };

  const meetingStartTime = moment(startTime);
  const meetingEndTime = meetingStartTime.clone().add(duration, 'hours');

  return (<div className={styles.tooltip} style={style}>
    <div className={styles.anchorContainer}>
      <div style={tooltipStyle} className={styles.anchor} />
    </div>
    <div className={styles.content}>
      <p>
        <strong>{ title }</strong>
        { meetingStartTime.format('h:mma') } - { meetingEndTime.format('h:mma') }
      </p>
      <p>
        <strong>{ roomTitle } Room</strong>
        by { isOwnedByUser ? 'me' : owner.name }
      </p>
    </div>
  </div>);
};

Tooltip.propTypes = {
  tooltipOffset: PropTypes.number,
  title: PropTypes.string,
  startTime: PropTypes.string,
  roomTitle: PropTypes.string,
  isOwnedByUser: PropTypes.bool,
  owner: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
  }),
  visible: PropTypes.bool,
  duration: PropTypes.number.isRequired,
};

export default Tooltip;
