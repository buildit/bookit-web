import React, { PropTypes } from 'react';

import styles from './styles.scss';
import Meeting from '../Meeting';

import { HOUR_WIDTH } from '../../../utils/calculateMeetingOffset';

class RoomTimeline extends React.Component {
  componentDidMount() {
    document.getElementById('timelines').scrollLeft = 653;
  }
  render() {
    const onTimelineClick = (e) => {
      const requestedStartTime = e.nativeEvent.offsetX / HOUR_WIDTH;
      this.props.populateMeetingCreateForm(this.props.room, requestedStartTime);
    };

    const timelineMeetings = this.props.meetings.map((meeting, index) =>
      <Meeting
        key={`${this.props.room.name}-${index}`}
        roomTitle={this.props.room.name}
        meeting={meeting}
      />
    );

    return (
      <div className={styles.room}>
        <div className={styles.timeline}>
          <div className={styles.meetings} onClick={onTimelineClick}>
            { timelineMeetings }
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
