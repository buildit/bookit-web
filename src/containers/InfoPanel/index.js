/*eslint-disable no-unused-vars*/
import React from 'react'
import PropTypes from 'prop-types'
import momentPropTypes from 'react-moment-proptypes'

import { Route } from 'react-router'

import { connect } from 'react-redux'

import {
  initMeetingForm,
  abortUserAction,
  populateMeetingEditForm,
  userRemoveStart,
  openInviteUserDialog,
 } from '../../actions'

import UIBlocker from '../../components/01-atoms/UIBlocker'
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
     userAction,
     users,
     onAbortUserAction,
     handleInitMeetingForm,
     onRemoveUserClick,
     onInviteClick,
     userToBeRemoved,
     ajax,
   } = this.props
    let agendaContent =
      <div>
        <Calendar key="0" />
        <ReservationList
          key="1"
          user={user}
          meetings={meetings}
          handleEditClick={handleReservationEditClick}
        />
      </div>
    if (userAction.match(/^(editing|creating|quickBooking)$/)) {
      agendaContent = <MeetingForm key="2" />
    }
    if (userAction === 'cancelling') {
      agendaContent = <MeetingCancel key="3" />
    }

    let adminContent = <RecentlyAddedUsersTable key="4" users={users} />
    if (userAction === 'removing') {
      adminContent =
        <ConfirmationDialog
          key="5"
          message="Are you sure you want to remove this user?"
          onClickYes={() => onRemoveUserClick(userToBeRemoved)}
          onClickNo={onAbortUserAction}
        />
    }
    if (userAction === 'inviting') {
      adminContent = <UserForm key="6"/>
    }


    return (
      <div className={styles.infoPanel}>

        <Route exact path="/" render={() => (
          <div
            onClick={() => (userAction.match(/^(editing|creating|quickBooking)$/)) ? onAbortUserAction() : handleInitMeetingForm()}
            className={(userAction.match(/^(editing|creating|quickBooking)$/)) ? styles.close : styles.invite}
          />
        )} />
        <Route exact path="/admin" render={() => (
          <div
            onClick={() => userAction === 'inviting' ? onAbortUserAction() : onInviteClick()}
            className={userAction === 'inviting' ? styles.close : styles.invite}
          />
        )} />
        { ajax ? <UIBlocker /> : '' }
        { (this.pathName === '' || this.pathName === '/') && agendaContent }
        { (this.pathName === 'admin' || this.pathName === '/admin') && adminContent }
        <Messages key="8" messages={messages} />
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
    userAction: state.app.userAction,
    users: state.users,
    userToBeRemoved: state.app.userToBeRemoved,
    ajax: state.ajax,
  })
}

const mapDispatchToProps = dispatch => ({
  handleReservationEditClick: (meeting) => {
    dispatch(populateMeetingEditForm(meeting))
  },
  onRemoveUserClick: (userEmail) => {
    dispatch(userRemoveStart(userEmail))
  },
  onAbortUserAction: () => {
    dispatch(abortUserAction())
  },
  onInviteClick: () => {
    dispatch(openInviteUserDialog())
  },
  handleInitMeetingForm: () => {
    dispatch(initMeetingForm('quick'))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(InfoPanel)

InfoPanel.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }),
  userAction: PropTypes.string.isRequired,
  messages: PropTypes.arrayOf(PropTypes.string),
  handleReservationEditClick: PropTypes.func.isRequired,
  onRemoveUserClick: PropTypes.func.isRequired,
  onAbortUserAction: PropTypes.func.isRequired,
  onInviteClick: PropTypes.func.isRequired,
  handleInitMeetingForm: PropTypes.func,
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
    email: PropTypes.string.isRequired,
    team: PropTypes.string.isRequired,
    roles: PropTypes.arrayOf(PropTypes.string),
  })),
  ajax: PropTypes.bool,
}
