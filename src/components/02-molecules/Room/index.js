import React, { PropTypes } from 'react';
import styles from './styles.scss';
import Timeline from '../../02-molecules/Timeline';

const Room = ({ room }) => (
  <div className={styles.room}>
    <div>{ room.name }</div>
    <Timeline meetings={room.meetings} />
  </div>
);

Room.propTypes = {
  room: PropTypes.shape({
    name: PropTypes.string.isRequired,
    meetings: PropTypes.array.isRequired,
  }).isRequired,
};

export default Room;
