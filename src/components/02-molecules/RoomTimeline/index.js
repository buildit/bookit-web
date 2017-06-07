import React, { PropTypes } from 'react';
import momentPropTypes from 'react-moment-proptypes';

import { HOUR_WIDTH } from '../../../utils/calculateMeetingOffset';

import Meeting from '../Meeting';

import styles from './styles.scss';

class RoomTimeline extends React.Component {
  componentDidMount() {
    document.getElementById('timelines').scrollLeft = 653;
  }

  render() {
    const onTimelineClick = (e) => {
      const requestedStartTime = e.nativeEvent.offsetX / HOUR_WIDTH;
      this.props.populateMeetingCreateForm(this.props.room, requestedStartTime);
    };

    return (
      <div className={styles.room}>
        <div className={`${styles.timeline} timeline`} >
          <div className={`${styles.meetings} meetings`} onClick={onTimelineClick}>
            { this.props.meetings.map(meeting => <Meeting key={meeting.id} meeting={meeting} />)}
          </div>
        </div>
      </div>
    );
  }
}

RoomTimeline.propTypes = {
  room: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
  meetings: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    start: momentPropTypes.momentObj.isRequired,
    end: momentPropTypes.momentObj.isRequired,
    duration: PropTypes.number.isRequired,
    isOwnedByUser: PropTypes.bool.isRequired,
    owner: PropTypes.shape({
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
    }).isRequired,
    roomName: PropTypes.string.isRequired,
    roomId: PropTypes.string.isRequired,
  })).isRequired,
  populateMeetingCreateForm: PropTypes.func.isRequired,
};

export default RoomTimeline;
