import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import moment from 'moment';

import styles from './styles.scss';

import RoomTimeline from '../../02-molecules/RoomTimeline';
import TimelineLabelList from '../../01-atoms/TimelineLabelList';
import CurrentTimeIndicator from '../../01-atoms/CurrentTimeIndicator';


class Agenda extends React.Component {
  componentDidMount() {
    this.props.requestRooms();
  }

  render() {
    const rooms = this.props.rooms;

    return (
      <div>

        <div className={styles.user}>
          <span className={styles.hello}>Hello</span>
          <span className={styles.name}>
            { this.props.user }
          </span>
        </div>
        <div className={styles.agenda}>
          <TimelineLabelList />
          { rooms.map(room => <RoomTimeline key={room.name} room={room} />) }
          <CurrentTimeIndicator />
        </div>
      </div>
    );
  }
}

Agenda.propTypes = {
  user: PropTypes.string,
  requestRooms: PropTypes.func,
  rooms: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = state => ({
  user: state.user.name,
  rooms: state.meetings.map(rm => {
    const meetings = rm.meetings.map(m => {
      const startMoment = moment(m.start);
      const endMoment = moment(m.end);
      const duration = endMoment.diff(startMoment, 'minutes') / 60;
      const isOwnedByUser = m.owner && (state.user.email === m.owner.email);
      return {
        startTime: moment(m.start).format('YYYY-MM-DDTHH:mm:ssZ'),
        duration,
        start: moment(m.start),
        end: moment(m.end),
        isOwnedByUser,
        participants: m.participants,
        owner: m.owner,
        title: m.subject,
      };
    });

    return {
      name: rm.room.name,
      meetings,
    };
  }),
});

const mapDispatchToProps = dispatch => ({
  requestRooms: () => {
    dispatch({ type: 'START_MEETINGS_REQUEST' });
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Agenda);
