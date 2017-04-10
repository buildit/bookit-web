import React, { PropTypes } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import styles from './styles.scss';
import Agenda from '../../components/03-organisms/Agenda';
import Calendar from '../../components/03-organisms/Calendar';
import { startMeetingsRequest } from '../../actions';

export class Dashboard extends React.Component {
  componentDidMount() {
    this.props.requestRooms();
  }

  render() {
    return (
      <div className={styles.app}>
        <div className={styles.user}>
          <span className={styles.hello}>Hello</span>
          <span className={styles.name}>
            { this.props.userName }
          </span>
        </div>
        <div className={styles.container}>
          <Calendar />
          <Agenda rooms={this.props.rooms} />
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  requestRooms: PropTypes.func,
  userName: PropTypes.string,
  rooms: PropTypes.arrayOf(PropTypes.object),
};

const mapStateToProps = state => ({
  userName: state.user.name,
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
    dispatch(startMeetingsRequest());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Dashboard);
