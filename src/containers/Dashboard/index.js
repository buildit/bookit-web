import React, { PropTypes } from 'react';
import momentPropTypes from 'react-moment-proptypes';
import { connect } from 'react-redux';

import Agenda from '../../components/03-organisms/Agenda';
import Calendar from '../../components/01-atoms/Calendar';
import Messages from '../../components/02-molecules/Messages';
import ReservationList from '../../components/02-molecules/ReservationList';

import MeetingCancel from '../../components/02-molecules/MeetingCancel';
import MeetingForm from '../MeetingForm';

import styles from './styles.scss';

import isMeetingOnDate from '../../utils/isMeetingOnDate';

import {
  meetingsFetchStart,
  populateMeetingCreateForm,
  populateMeetingEditForm,
  logout,
 } from '../../actions';

export class DashboardContainer extends React.Component {
  componentDidMount() {
    // This fetches meetings.
    // It should happen whenever `selectedDate` is updated.
    // It should not be called `requestRooms`, probably.
    this.props.requestRooms();
  }

  leftPaneContent() {
    if (this.props.isEditingMeeting) { return <MeetingForm />; }
    if (this.props.isCreatingMeeting) { return <MeetingForm />; }
    if (this.props.isCancellingMeeting) { return (<MeetingCancel />); }
    return (<Calendar selectedDate={this.props.selectedDate} />);
  }

  render() {
    const {
      messages,
      user,
      meetings,
      rooms,
    } = this.props;
    return (
      <div className={styles.app}>
        <div className={styles.container}>
          <div className={styles.leftPane}>
            { this.leftPaneContent() }
            <Messages messages={messages} />
            <ReservationList
              user={user}
              meetings={meetings.filter(meeting => meeting.isOwnedByUser)}
              handleEditClick={this.props.populateMeetingEditForm}
            />
          </div>
          <div className={styles.user}>
            <span className={styles.hello}>Hello</span>
            <span className={styles.name}>
              { user.name }!
            </span>
            <span className={styles.logout} onClick={this.props.logout}>Log Out</span>
          </div>
          <Agenda
            meetings={meetings}
            rooms={rooms}
            populateMeetingCreateForm={this.props.populateMeetingCreateForm}
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
  isEditingMeeting: PropTypes.bool,
  isCreatingMeeting: PropTypes.bool.isRequired,
  isCancellingMeeting: PropTypes.bool,
  selectedDate: PropTypes.shape({}).isRequired,
  messages: PropTypes.arrayOf(PropTypes.string),
  requestRooms: PropTypes.func,
  populateMeetingCreateForm: PropTypes.func.isRequired,
  populateMeetingEditForm: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  meetings: PropTypes.arrayOf(
    PropTypes.shape({
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
    })
  ).isRequired,
  rooms: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};


const mapStateToProps = state => {
  const {
    allMeetingIds,
    meetingsById,
    allRoomIds,
    roomsById,
    selectedDate,
    isCreatingMeeting,
    isEditingMeeting,
    isCancellingMeeting,
    meetingEditForm,
    messages,
    requestedMeeting,
  } = state.app;

  const meetings = allMeetingIds
    .map(id => meetingsById[id])
    .filter(meeting => isMeetingOnDate(meeting, selectedDate))
    .map(meeting => ({
      ...meeting,
      isOwnedByUser: meeting.owner.email === state.user.email }));

  const rooms = allRoomIds.map(id => roomsById[id]);

  return ({
    user: state.user,
    meetings,
    rooms,
    isCreatingMeeting,
    isEditingMeeting,
    isCancellingMeeting,
    meetingEditForm,
    messages,
    selectedDate,
    requestedMeeting,
  });
};

const mapDispatchToProps = dispatch => ({
  requestRooms: () => {
    // Why does `requestRooms` fetch Meetings?
    // TODO: Fetch meetings for selectedDate.
    dispatch(meetingsFetchStart());
  },
  populateMeetingCreateForm: (room, meeting) => {
    dispatch(populateMeetingCreateForm(room, meeting));
  },
  populateMeetingEditForm: meeting => {
    dispatch(populateMeetingEditForm(meeting));
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
