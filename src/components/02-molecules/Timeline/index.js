import React, { PropTypes } from 'react';
import styles from './styles.scss';

import Meeting from '../../01-atoms/Meeting';

const Timeline = ({ roomName, meetings = [] }) => {
  const timelineMeetings = meetings.map((meeting, index) =>
    <Meeting
      key={`${roomName}-${index}`}
      isOwnedByUser={meeting.isOwnedByUser}
      duration={meeting.duration}
      startTime={meeting.startTime}
    />
  );

  return (<div className={styles.timeline}>
    <div className={styles.meetings}>
      {timelineMeetings}
    </div>
  </div>);
};

Timeline.propTypes = {
  roomName: PropTypes.string.isRequired,
  meetings: PropTypes.arrayOf(PropTypes.object),
};

export default Timeline;
