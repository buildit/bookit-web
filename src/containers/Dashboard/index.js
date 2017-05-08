import React, { PropTypes } from 'react';

import moment from 'moment';

import { connect } from 'react-redux';

import styles from './styles.scss';

import Agenda from '../../components/03-organisms/Agenda';
import Calendar from '../../components/03-organisms/Calendar';
import Messages from '../../components/02-molecules/Messages/index';
import MeetingForm from '../MeetingForm';

import {
  meetingsFetchStart,
  populateMeetingForm,
  logout,
 } from '../../actions';

export class DashboardContainer extends React.Component {
  componentDidMount() {
    this.props.requestRooms();
  }

  leftPaneContent() {
    if (this.props.isEditingMeeting) {
      return (
        <MeetingForm />
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
          <span className={styles.divider}>|</span>
          <span className={styles.logout} onClick={this.props.logout}>Logout</span>
        </div>
        <div className={styles.container}>
          <div className={styles.leftPane}>
            { this.leftPaneContent() }
            <Messages messages={this.props.messages} />
          </div>
          <Agenda
            roomMeetings={this.props.rooms}
            populateMeetingForm={this.props.populateMeetingForm}
          />
        </div>
      </div>
    );
  }
}

DashboardContainer.propTypes = {
  requestRooms: PropTypes.func,
  userName: PropTypes.string,
  rooms: PropTypes.arrayOf(PropTypes.object),
  populateMeetingForm: PropTypes.func.isRequired,
  isEditingMeeting: PropTypes.bool,
  messages: PropTypes.arrayOf(PropTypes.string),
  logout: PropTypes.func.isRequired,
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
  rooms: state.app.meetings.map(rm => mapMeeting(rm, state.user)),
  isEditingMeeting: state.app.isEditingMeeting,
  meetingEditForm: state.app.meetingEditForm,
  messages: state.app.messages,
});

const mapDispatchToProps = dispatch => ({
  requestRooms: () => {
    dispatch(meetingsFetchStart());
  },
  populateMeetingForm: (room, meeting) => {
    dispatch(populateMeetingForm(room, meeting));
  },
  logout: () => {
    dispatch(logout());
  },
});

const connected = connect(
  mapStateToProps,
  mapDispatchToProps,
)(DashboardContainer);

export default connected;
