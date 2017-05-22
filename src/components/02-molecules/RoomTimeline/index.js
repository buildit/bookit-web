import React, { PropTypes } from 'react';

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
        <div className={styles.timeline}>
          <div className={styles.meetings} onClick={onTimelineClick}>
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
  meetings: PropTypes.arrayOf(PropTypes.object).isRequired,
  populateMeetingCreateForm: PropTypes.func.isRequired,
};

export default RoomTimeline;
