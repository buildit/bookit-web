import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import momentPropTypes from 'react-moment-proptypes';
import {
  populateMeetingEditForm,
  userRemoveStart,
  closeConfirmationDialog,
 } from '../../actions';
import styles from './styles.scss';
import Calendar from '../../components/01-atoms/Calendar';
import Messages from '../../components/02-molecules/Messages';
import ReservationList from '../../components/02-molecules/ReservationList';
import RecentlyAddedUsersTable from '../../components/02-molecules/RecentlyAddedUsersTable';
import MeetingCancel from '../../components/02-molecules/MeetingCancel';
import ConfirmationDialog from '../../components/02-molecules/ConfirmationDialog';
import MeetingForm from '../MeetingForm';
import isMeetingOnDate from '../../utils/isMeetingOnDate';

class InfoPanel extends React.Component {
  constructor(props) {
    super(props);
    this.pathName = props.pathName;
  }

  render() {
    const {
     messages,
     meetings,
     user,
     handleReservationEditClick,
     isEditingMeeting,
     isCancellingMeeting,
     isCreatingMeeting,
     isRemovingUser,
     users,
     onRemoveUserClick,
     userToBeRemoved,
     onAbortRemovingUser,
   } = this.props;

    let content = [];

    if (this.pathName === 'dashboard' || this.pathName === '/dashboard') {
      content.push(
        <Calendar />,
        <ReservationList
          user={user}
          meetings={meetings}
          handleEditClick={handleReservationEditClick}
        />);
      if (isEditingMeeting || isCreatingMeeting) {
        content = [<MeetingForm />];
      }
      if (isCancellingMeeting) {
        content = [<MeetingCancel />];
      }
    }

    if (this.pathName === 'admin' || this.pathName === '/admin') {
      content = [<RecentlyAddedUsersTable users={users} />];

      if (isRemovingUser) {
        content = [
          <ConfirmationDialog
            message="Are you sure you want to remove this user?"
            onClickYes={() => onRemoveUserClick(userToBeRemoved)}
            onClickNo={onAbortRemovingUser}
          />,
        ];
      }
    }

    content.push(<Messages messages={messages} />);

    return (
      <div className={styles.infoPanel}>
        { content }
      </div>
   );
  }
}

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
    isRemovingUser: state.app.isRemovingUser,
    users: state.users,
    userToBeRemoved: state.app.userToBeRemoved,
  });
};

const mapDispatchToProps = dispatch => ({
  handleReservationEditClick: meeting => {
    dispatch(populateMeetingEditForm(meeting));
  },
  onRemoveUserClick: userEmail => {
    dispatch(userRemoveStart(userEmail));
  },
  onAbortRemovingUser: () => {
    dispatch(closeConfirmationDialog());
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
  isRemovingUser: PropTypes.bool.isRequired,
  messages: PropTypes.arrayOf(PropTypes.string),
  handleReservationEditClick: PropTypes.func.isRequired,
  onAbortRemovingUser: PropTypes.func.isRequired,
  onRemoveUserClick: PropTypes.func.isRequired,
  userToBeRemoved: PropTypes.string,
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
  pathName: PropTypes.string.isRequired,
  users: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    team: PropTypes.string.isRequired,
  }),
),
};
