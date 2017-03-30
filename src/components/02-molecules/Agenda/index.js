import React, { PropTypes } from 'react';

import moment from 'moment';

import styles from './styles.scss';

import Room from '../../02-molecules/Room';
import Timelabel from '../../01-atoms/Timelabel';

const timelabels = () => {
  const labels = [];
  const hours = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

  for (const hour of hours) {
    labels.push(<Timelabel hour={hour} />);
  }

  for (const hour of hours) {
    labels.push(<Timelabel hour={hour} postMeridian="true" />);
  }

  return labels;
};

const Agenda = ({ viewDate, rooms = [] }) => {
  viewDate = moment(viewDate);
  const agendaRooms = rooms.map(room =>
    <Room room={room} />
  );

  return (<div className={styles.agenda}>
    <div className={styles.timelabels}>
      {timelabels()}
    </div>
    {agendaRooms}
  </div>);
};

Agenda.propTypes = {
  viewDate: PropTypes.string,
  rooms: PropTypes.arrayOf(PropTypes.object),
};

export default Agenda;
