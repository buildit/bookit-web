/*eslint-disable no-unused-vars*/
import React from 'react'
import PropTypes from 'prop-types'
import momentPropTypes from 'react-moment-proptypes'

import { connect } from 'react-redux'

import {
  populateMeetingEditForm,
  userRemoveStart,
  openInviteUserDialog,
  closeConfirmationDialog,
 } from '../../actions'

import Calendar from '../../components/01-atoms/Calendar'
import Messages from '../../components/02-molecules/Messages'
import ReservationList from '../../components/02-molecules/ReservationList'
import RecentlyAddedUsersTable from '../../components/02-molecules/RecentlyAddedUsersTable'
import MeetingCancel from '../../components/02-molecules/MeetingCancel'
import ConfirmationDialog from '../../components/02-molecules/ConfirmationDialog'
import MeetingForm from '../MeetingForm'
import UserForm from '../UserForm'
import isMeetingOnDate from '../../utils/isMeetingOnDate'

import styles from './styles.scss'

class InfoPanel extends React.Component {
  constructor(props) {
    super(props)
    this.pathName = props.pathName
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
     isInvitingUser,
     users,
     onRemoveUserClick,
     onInviteClick,
     userToBeRemoved,
     onAbortRemovingUser,
   } = this.props

    let content = []

    if (this.pathName === '' || this.pathName === '/') {
      content.push(
        <Calendar key="0" />,
        <ReservationList
          key="1"
          user={user}
          meetings={meetings}
          handleEditClick={handleReservationEditClick}
        />)
      if (isEditingMeeting || isCreatingMeeting) {
        content = [<MeetingForm key="2" />]
      }
      if (isCancellingMeeting) {
        content = [<MeetingCancel key="3" />]
      }
    }

    if (this.pathName === 'admin' || this.pathName === '/admin') {
      content.push(
        <div className={styles.invite} onClick={() => onInviteClick()}>Invite User </div>
      )
      content.push(<RecentlyAddedUsersTable key="4" users={users} />)

      if (isRemovingUser) {
        content = [
          <ConfirmationDialog
            key="5"
            message="Are you sure you want to remove this user?"
            onClickYes={() => onRemoveUserClick(userToBeRemoved)}
            onClickNo={onAbortRemovingUser}
          />,
        ]
      }

      if (isInvitingUser) {
        content = [<UserForm key="7"/>]
      }
    }

    content.push(<Messages key="6" messages={messages} />)

    return (
      <div className={styles.infoPanel}>
        { content }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { allMeetingIds, meetingsById, selectedDate } = state.app

  const meetings = allMeetingIds
    .map(id => meetingsById[id])
    .filter(meeting => isMeetingOnDate(meeting, selectedDate))
    .filter(meeting => meeting.owner.email === state.user.email)

  return ({
    messages: state.app.messages,
    meetings,
    user: state.app.user,
    isEditingMeeting: state.app.isEditingMeeting,
    isCancellingMeeting: state.app.isCancellingMeeting,
    isCreatingMeeting: state.app.isCreatingMeeting,
    isRemovingUser: state.app.isRemovingUser,
    isInvitingUser: state.app.isInvitingUser,
    users: state.users,
    userToBeRemoved: state.app.userToBeRemoved,
  })
}

const mapDispatchToProps = dispatch => ({
  handleReservationEditClick: (meeting) => {
    dispatch(populateMeetingEditForm(meeting))
  },
  onRemoveUserClick: (userEmail) => {
    dispatch(userRemoveStart(userEmail))
  },
  onAbortRemovingUser: () => {
    dispatch(closeConfirmationDialog())
  },
  onInviteClick: () => {
    dispatch(openInviteUserDialog())
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(InfoPanel)

InfoPanel.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }),
  isEditingMeeting: PropTypes.bool,
  isCreatingMeeting: PropTypes.bool.isRequired,
  isCancellingMeeting: PropTypes.bool,
  isInvitingUser: PropTypes.bool,
  isRemovingUser: PropTypes.bool.isRequired,
  messages: PropTypes.arrayOf(PropTypes.string),
  handleReservationEditClick: PropTypes.func.isRequired,
  onAbortRemovingUser: PropTypes.func.isRequired,
  onRemoveUserClick: PropTypes.func.isRequired,
  onInviteClick: PropTypes.func.isRequired,
  userToBeRemoved: PropTypes.string,
  meetings: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      start: momentPropTypes.momentObj.isRequired,
      end: momentPropTypes.momentObj.isRequired,
      duration: PropTypes.number.isRequired,
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
  })
),
}
