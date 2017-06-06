import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import momentPropTypes from 'react-moment-proptypes';
import {
  populateMeetingEditForm,
 } from '../../actions';
import styles from './styles.scss';
import Calendar from '../../components/01-atoms/Calendar';
import Messages from '../../components/02-molecules/Messages';
import ReservationList from '../../components/02-molecules/ReservationList';
import MeetingCancel from '../../components/02-molecules/MeetingCancel';
import MeetingForm from '../MeetingForm';
import isMeetingOnDate from '../../utils/isMeetingOnDate';

const InfoPanel = ({
  messages,
  meetings,
  user,
  handleReservationEditClick,
  isEditingMeeting,
  isCancellingMeeting,
  isCreatingMeeting }) => {
  let content = [
    <Calendar />,
    <ReservationList
      user={user}
      meetings={meetings.filter(meeting => meeting.isOwnedByUser)}
      handleEditClick={handleReservationEditClick}
    />,
  ];

  if (isEditingMeeting || isCreatingMeeting) {
    content = [<MeetingForm />];
  }
  if (isCancellingMeeting) {
    content = [<MeetingCancel />];
  }
  content.push(<Messages messages={messages} />);

  return (
    <div className={styles.infoPanel}>
      { content }
    </div>
); };

const mapStateToProps = state => {
  const { allMeetingIds, meetingsById, selectedDate } = state.app;

  const meetings = allMeetingIds
    .map(id => meetingsById[id])
    .filter(meeting => isMeetingOnDate(meeting, selectedDate))
    .filter(meeting => meeting.owner.email === state.user.email);

  return ({
    messages: state.app.messages,
    meetings,
    user: state.app.user,
    isEditingMeeting: state.app.isEditingMeeting,
    isCancellingMeeting: state.app.isCancellingMeeting,
    isCreatingMeeting: state.app.isCreatingMeeting,
  });
};

const mapDispatchToProps = dispatch => ({
  handleReservationEditClick: meeting => {
    dispatch(populateMeetingEditForm(meeting));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(InfoPanel);

InfoPanel.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }),
  isEditingMeeting: PropTypes.bool,
  isCreatingMeeting: PropTypes.bool.isRequired,
  isCancellingMeeting: PropTypes.bool,
  messages: PropTypes.arrayOf(PropTypes.string),
  handleReservationEditClick: PropTypes.func.isRequired,
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
};
