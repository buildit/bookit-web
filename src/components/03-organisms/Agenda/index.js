import React, { PropTypes } from 'react';

import moment from 'moment';

import styles from './styles.scss';

import Room from '../../02-molecules/Room';
import TimelineLabelList from '../../01-atoms/TimelineLabelList';
import CurrentTimeIndicator from '../../01-atoms/CurrentTimeIndicator';

const Agenda = ({ viewDate, rooms = [] }) => {
  viewDate = moment(viewDate);

  return (
    <div>
      <div className={styles.agenda}>
        <TimelineLabelList />
        { rooms.map(room => <Room room={room} />) }
        <CurrentTimeIndicator />
      </div>
    </div>
  );
};

Agenda.propTypes = {
  viewDate: PropTypes.string,
  rooms: PropTypes.arrayOf(PropTypes.object),
};

export default Agenda;
