import React, { PropTypes } from 'react';

import styles from './styles.scss';

import calculateTooltipOffset from '../../../utils/calculateTooltipOffset';
import calculateWidth from '../../../utils/calculateWidth';

const Tooltip = ({
  tooltipOffset, title, startTime, duration, roomTitle, isOwnedByUser, owner, visible,
}) => {
  const style = {
    display: 'block',
    opacity: visible ? 1 : 0,
    left: visible ? calculateTooltipOffset(duration) : -99999,
  };

  const anchorStyle = {
    width: calculateWidth(duration) + 20.0,
  };

  const tooltipStyle = {
    left: tooltipOffset,
  };

  const meetingStartTime = startTime;
  const meetingEndTime = meetingStartTime.clone().add(duration, 'hours');

  const truncatePhrase = (phrase) => {
    const TITLE_LENGTH = 25;
    return `${phrase.slice(0, TITLE_LENGTH)} ...`;
  };

  return (<div className={styles.tooltip} style={style}>
    <div style={anchorStyle} className={styles.anchorContainer}>
      <div style={tooltipStyle} className={styles.anchor} />
    </div>
    <div className={styles.content}>
      <p>
        <strong>{ truncatePhrase(title) }</strong>
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
  startTime: PropTypes.shape({}),
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
