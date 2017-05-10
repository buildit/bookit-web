import React, { PropTypes } from 'react';
import styles from './styles.scss';
import TimelineLabelList from '../../01-atoms/TimelineLabelList';
import RoomTimeline from '../../02-molecules/RoomTimeline';
import RoomTimelineNames from '../../02-molecules/RoomTimelineNames';
import CurrentTimeIndicator from '../../01-atoms/CurrentTimeIndicator';

const Agenda = ({ roomMeetings = [], createMeetingRequest }) => (
  <div className={styles.agenda} id={'agenda'}>
    <div className={styles.column}>
      {
        roomMeetings.map(roomMeeting => (
          <RoomTimelineNames
            key={roomMeeting.room.name}
            room={roomMeeting.room}
          />
        ))
      }
    </div>
    <div className={styles.column}>
      <TimelineLabelList />
      { roomMeetings.map(roomMeeting => (
        <RoomTimeline
          key={roomMeeting.room.name}
          meetings={roomMeeting.meetings}
          room={roomMeeting.room}
          createMeetingRequest={createMeetingRequest}
        />
        )) }
      <CurrentTimeIndicator />
    </div>
  </div>
  );

Agenda.propTypes = {
  roomMeetings: PropTypes.arrayOf(PropTypes.shape({
    room: PropTypes.shape({
      name: PropTypes.string,
      email: PropTypes.string,
    }).isRequired,
    meetings: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string,
      participants: PropTypes.array,
      owner: PropTypes.object,
      start: PropTypes.object,
      end: PropTypes.object,
    })),
  })),
  createMeetingRequest: PropTypes.func.isRequired,
};

export default Agenda;
