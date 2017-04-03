import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import moment from 'moment';

import styles from './styles.scss';

import RoomTimeline from '../../02-molecules/RoomTimeline';
import TimelineLabelList from '../../01-atoms/TimelineLabelList';
import CurrentTimeIndicator from '../../01-atoms/CurrentTimeIndicator';

class Agenda extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      viewDate: null,
      rooms: [],
    };

    this.props.requestRooms();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ rooms: nextProps.rooms });
  }

  render() {
    const rooms = this.state.rooms;

    return (
      <div>
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
  requestRooms: PropTypes.func,
};

const mapStateToProps = state => ({
  rooms: state.rooms,
});

const mapDispatchToProps = dispatch => ({
  requestRooms: () => {
    dispatch({ type: 'ROOMS_REQUESTED' });
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Agenda);
