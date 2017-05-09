import React, { PropTypes } from 'react';

import styles from './styles.scss';
import Meeting from '../Meeting';
import { HOUR_WIDTH } from '../../../utils/calculateMeetingOffset';

const RoomTimeline = ({ room, meetings, populateMeetingForm }) => {
  const onTimelineClick = (e) => {
    const requestedStartTime = e.nativeEvent.offsetX / HOUR_WIDTH;
    populateMeetingForm(room, requestedStartTime);
  };

  const timelineMeetings = meetings.map((meeting, index) =>
    <Meeting
      key={`${room.name}-${index}`}
      roomTitle={room.name}
      owner={meeting.owner}
      isOwnedByUser={meeting.isOwnedByUser}
      startTime={meeting.start}
      duration={meeting.duration}
      title={meeting.title}
    />
  );

  return (
    <div className={styles.room}>
      <div className={styles.timeline}>
        <div className={styles.meetings} onClick={onTimelineClick}>
          { timelineMeetings }
        </div>
      </div>
      <div className={styles.roomName}>{ room.name }</div>
    </div>
  );
};

RoomTimeline.propTypes = {
  room: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
  meetings: PropTypes.arrayOf(PropTypes.object).isRequired,
  populateMeetingForm: PropTypes.func.isRequired,
};

export default RoomTimeline;
