import React, { PropTypes } from 'react';
import styles from './styles.scss';
import Room from '../../02-molecules/Room';

const Agenda = ({ rooms = [] }) => {
  const agendaRooms = rooms.map(room =>
    <Room room={room} />
  );

  return (<div className={styles.agenda}>
    {agendaRooms}
  </div>);
};

Agenda.propTypes = {
  rooms: PropTypes.arrayOf(PropTypes.object),
};

export default Agenda;
