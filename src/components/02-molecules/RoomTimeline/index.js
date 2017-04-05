import React, { PropTypes } from 'react';
import styles from './styles.scss';
import Meeting from '../Meeting';

const RoomTimeline = ({ room }) => {
  const timelineMeetings = room.meetings.map((meeting, index) =>
    <Meeting
      key={`${room.name}-${index}`}
      roomTitle={room.name}
      owner={meeting.owner}
      isOwnedByUser={meeting.isOwnedByUser}
      startTime={meeting.startTime}
      duration={meeting.duration}
    />
  );

  return (
    <div className={styles.room}>
      <div className={styles.timeline}>
        <div className={styles.meetings}>
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
    meetings: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
};

export default RoomTimeline;
