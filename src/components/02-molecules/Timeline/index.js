import React, { PropTypes } from 'react';
import styles from './styles.scss';

import Timeblock from '../../01-atoms/Timeblock';
import Meeting from '../../01-atoms/Meeting';

const timeblocks = () => {
  const blocks = [];
  let n = 0;

  while (n < 24) {
    n += 1;
    blocks.push(<Timeblock />);
  }
  return blocks;
};

const Timeline = ({ meetings = [] }) => {
  const timelineMeetings = meetings.map(meeting =>
    <Meeting
      isOwnedByUser={meeting.isOwnedByUser}
      duration={meeting.duration}
      startTime={meeting.startTime}
    />
  );

  return (<div className={styles.timeline}>
    <div className={styles.timelineTimeblocks}>
      {timeblocks()}
    </div>
    <div className={styles.timelineMeetings}>
      {timelineMeetings}
    </div>
  </div>);
};

Timeline.propTypes = {
  meetings: PropTypes.arrayOf(PropTypes.object),
};

export default Timeline;
