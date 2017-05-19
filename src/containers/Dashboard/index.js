import React, { PropTypes } from 'react';

import moment from 'moment';

import { connect } from 'react-redux';

import styles from './styles.scss';

import Agenda from '../../components/03-organisms/Agenda';
import Calendar from '../../components/01-atoms/Calendar';
import Messages from '../../components/02-molecules/Messages';

import MeetingCancel from '../../components/02-molecules/MeetingCancel';

import MeetingForm from '../MeetingForm';

import {
  meetingsFetchStart,
  populateMeetingForm,
  logout,
 } from '../../actions';

export class DashboardContainer extends React.Component {
  componentDidMount() {
    // This fetches meetings. It should happen whenever `selectedDate` is updated.
    this.props.requestRooms();
  }

  leftPaneContent() {
    if (this.props.isEditingMeeting) {
      return (
        <MeetingForm />
      );
    } else if (this.props.isCancellingMeeting) {
      return (<MeetingCancel />);
    }
    return (<Calendar selectedDate={this.props.selectedDate} />);
  }

  render() {
    const {
      messages,
      user,
      agenda,
    } = this.props;

    return (
      <div className={styles.app}>
        <div className={styles.container}>
          <div className={styles.leftPane}>
            { this.leftPaneContent() }
            <Messages messages={messages} />
          </div>
          <div className={styles.user}>
            <span className={styles.hello}>Hello</span>
            <span className={styles.name}>
              { user.name }!
            </span>
            <span className={styles.logout} onClick={this.props.logout}>Log Out</span>
          </div>
          <Agenda
            agenda={agenda}
            populateMeetingForm={this.props.populateMeetingForm}
          />
        </div>
      </div>
    );
  }
}

DashboardContainer.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }),
  agenda: PropTypes.arrayOf(PropTypes.object),
  isEditingMeeting: PropTypes.bool,
  isCancellingMeeting: PropTypes.bool,
  selectedDate: PropTypes.shape({}).isRequired,
  messages: PropTypes.arrayOf(PropTypes.string),
  requestRooms: PropTypes.func,
  populateMeetingForm: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
};

const mapMeeting = (room, user) => {
  const meetings = room.meetings.map(meeting => {
    const start = moment(meeting.start);
    const end = moment(meeting.end);
    const duration = end.diff(start, 'minutes') / 60;
    return {
      id: meeting.id,
      start,
      end,
      duration,
      isOwnedByUser: meeting.owner && (user.email === meeting.owner.email),
      participants: meeting.participants,
      owner: meeting.owner,
      title: meeting.title,
      room: room.room,
    };
  });

  return {
    room: room.room,
    meetings,
  };
};

const mapStateToProps = state => ({
  user: state.user,
  agenda: state.app.meetings.map(room => mapMeeting(room, state.user)),
  isEditingMeeting: state.app.isEditingMeeting,
  isCancellingMeeting: state.app.isCancellingMeeting,
  meetingEditForm: state.app.meetingEditForm,
  messages: state.app.messages,
  selectedDate: state.app.selectedDate,
});

const mapDispatchToProps = dispatch => ({
  requestRooms: () => {
    // Why does `requestRooms` fetch Meetings?
    // TODO: Fetch meetings for selectedDate.
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
