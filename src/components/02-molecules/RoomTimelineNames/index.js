import React, { PropTypes } from 'react';

import styles from './styles.scss';
import Meeting from '../Meeting';

const RoomTimelineNames = ({ room, meetings, createMeetingRequest }) => {
  return (
    <div className={styles.room}>
      <div className={styles.roomName}>{ room.name }</div>
    </div>
  );
};

RoomTimelineNames.propTypes = {
  room: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
};

export default RoomTimelineNames;
