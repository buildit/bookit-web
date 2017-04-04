import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import styles from './styles.scss';

import Meeting from '../Meeting';

import { timelineMeetingRequested } from '../../../actions';

const RoomTimeline = ({ room, onRoomTimelineClick }) => {
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
      <div className={styles.timeline} onClick={() => { onRoomTimelineClick(); }}>
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
  onRoomTimelineClick: PropTypes.func,
};

const mapStateToProps = state => ({
  message: state.message,
});

const mapDispatchToProps = dispatch => ({
  onRoomTimelineClick: () => {
    dispatch(timelineMeetingRequested());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RoomTimeline);
