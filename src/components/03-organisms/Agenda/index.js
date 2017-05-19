import React, { PropTypes } from 'react';

import roomTimelineNames from '../../01-atoms/RoomTimelineNames';
import timelineLabelList from '../../01-atoms/TimelineLabelList';
import currentTimeIndicator from '../../01-atoms/CurrentTimeIndicator';

import RoomTimeline from '../../02-molecules/RoomTimeline';

import styles from './styles.scss';

const renderRoomTimelines = (agenda, populateMeetingForm) => agenda.map(({ room, meetings }) => (
  <RoomTimeline
    key={room.name}
    meetings={meetings}
    room={room}
    populateMeetingForm={populateMeetingForm}
  />
));

const Agenda = ({ agenda = [], populateMeetingForm }) => (
  <div className={styles.agenda}>
    <div className={styles.column}>
      { roomTimelineNames(agenda) }
    </div>
    <div className={[styles.column, styles.timeline].join(' ')} id="timelines">
      { timelineLabelList() }
      { renderRoomTimelines(agenda, populateMeetingForm) }
      { currentTimeIndicator() }
    </div>
  </div>
  );

Agenda.propTypes = {
  agenda: PropTypes.arrayOf(PropTypes.shape({
    room: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
    meetings: PropTypes.arrayOf(PropTypes.object).isRequired,
  })),
  populateMeetingForm: PropTypes.func.isRequired,
};

export default Agenda;
