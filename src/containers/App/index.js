import React, { PropTypes } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import styles from './styles.scss';
import Agenda from '../../components/03-organisms/Agenda';
import Calendar from '../../components/03-organisms/Calendar';
import { startMeetingsRequest, populateMeetingEditForm } from '../../actions';

export class AppInner extends React.Component {
  componentDidMount() {
    this.props.requestRooms();
  }

  leftPaneContent() {
    if (this.props.isEditingMeeting) {
      return (
        <div>{JSON.stringify(this.props.meetingEditForm)}</div>
      );
    }
    return (<Calendar />);
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
          { this.leftPaneContent() }
          <Agenda
            roomMeetings={this.props.rooms}
            createMeetingRequest={this.props.createMeetingRequest}
          />
        </div>
      </div>
    );
  }
}

AppInner.propTypes = {
  requestRooms: PropTypes.func,
  userName: PropTypes.string,
  rooms: PropTypes.arrayOf(PropTypes.object),
  createMeetingRequest: PropTypes.func.isRequired,
  isEditingMeeting: PropTypes.bool,
  meetingEditForm: PropTypes.shape({
    title: PropTypes.string,
    startTime: PropTypes.object,
    endTime: PropTypes.object,
    room: PropTypes.object,
  }),
};

const mapMeeting = (rm, user) => {
  const meetings = rm.meetings.map(m => {
    const startMoment = moment(m.start);
    const endMoment = moment(m.end);
    const duration = endMoment.diff(startMoment, 'minutes') / 60;
    const isOwnedByUser = m.owner && (user.email === m.owner.email);
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
    room: rm.room,
    meetings,
  };
};

const mapStateToProps = state => ({
  userName: state.user.name,
  rooms: state.meetings.map(rm => mapMeeting(rm, state.user)),
  isEditingMeeting: state.isEditingMeeting,
  meetingEditForm: state.meetingEditForm,
});

const mapDispatchToProps = dispatch => ({
  requestRooms: () => {
    dispatch(startMeetingsRequest());
  },
  createMeetingRequest: (room, meeting) => {
    dispatch(populateMeetingEditForm(room, meeting));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AppInner);
