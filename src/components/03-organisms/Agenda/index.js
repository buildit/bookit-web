import React, { PropTypes } from 'react';
import styles from './styles.scss';
import TimelineLabelList from '../../01-atoms/TimelineLabelList';
import RoomTimeline from '../../02-molecules/RoomTimeline';
import CurrentTimeIndicator from '../../01-atoms/CurrentTimeIndicator';

const Agenda = ({ rooms = [] }) => (
  <div className={styles.agenda}>
    <TimelineLabelList />
    { rooms.map(room => <RoomTimeline key={room.name} room={room} />) }
    <CurrentTimeIndicator />
  </div>
);

Agenda.propTypes = {
  rooms: PropTypes.arrayOf(PropTypes.object),
};

export default Agenda;
