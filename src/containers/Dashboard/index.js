import React from 'react'
import PropTypes from 'prop-types'
import momentPropTypes from 'react-moment-proptypes'
import { connect } from 'react-redux'

import { Route } from 'react-router'

import SearchableUserTable from '../../components/03-organisms/SearchableUserTable'
import Agenda from '../../components/03-organisms/Agenda'
import Header from '../../components/02-molecules/Header'
import InfoPanel from '../InfoPanel'

import isMeetingOnDate from '../../utils/isMeetingOnDate'

import { isAuthorizedUser } from '../../utils/check-auth'

import styles from './styles.scss'

import {
  meetingsFetchStart,
  populateMeetingCreateForm,
  populateMeetingEditForm,
  openRemoveUserDialog,
  usersFetchStart,
  logout,
 } from '../../actions'

export class DashboardContainer extends React.Component {
  componentDidMount() {
    // This fetches meetings.
    // It should happen whenever `selectedDate` is updated.
    // It should not be called `requestRooms`, probably.
    this.props.checkIsAuthorizedUser(this.props.user)
    this.props.requestRooms()
    this.props.fetchUsersList()
  }

  render() {
    const {
      user,
      users,
      meetings,
      rooms,
      onLogoutClick,
      onRemoveClick,
      location,
    } = this.props

    console.log(location)

    return (
      <div className={styles.dashboard}>
        <Route path="/" component={InfoPanel} />
        {/*<InfoPanel pathName={location.pathname} />*/}
        <main>
          <Header user={user} logout={onLogoutClick} />
          <Route path="/" exact={true} render={() => (
            <Agenda
              meetings={meetings}
              rooms={rooms}
              populateMeetingCreateForm={this.props.populateMeetingCreateForm}
              meetingFormIsActive={this.props.meetingFormIsActive}
            />
          )}/>
          <Route path="/admin" exact={true} render={() => (
            <SearchableUserTable users={users} onRemoveClick={onRemoveClick} />
          )}/>
          {/* <Agenda
            meetings={meetings}
            rooms={rooms}
            populateMeetingCreateForm={this.props.populateMeetingCreateForm}
            meetingFormIsActive={this.props.meetingFormIsActive}
          /> */}
        </main>
      </div>
    )
  }
}

DashboardContainer.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }),
  users: PropTypes.arrayOf(
    PropTypes.shape({
      email: PropTypes.string.isRequired,
      team: PropTypes.string.isRequired,
      roles: PropTypes.arrayOf(PropTypes.string).isRequired,
    })
  ),
  requestRooms: PropTypes.func,
  populateMeetingCreateForm: PropTypes.func.isRequired,
  onLogoutClick: PropTypes.func.isRequired,
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
  location: PropTypes.shape({}),
  isEditingMeeting: PropTypes.bool.isRequired,
  meetingFormIsActive: PropTypes.bool.isRequired,
  onRemoveClick: PropTypes.func.isRequired,
  fetchUsersList: PropTypes.func.isRequired,
  checkIsAuthorizedUser: PropTypes.func,
}

const mapStateToProps = (state) => {
  const {
    allMeetingIds,
    meetingsById,
    allRoomIds,
    roomsById,
    selectedDate,
    isCreatingMeeting,
    isEditingMeeting,
    isCancellingMeeting,
    isInvitingUser,
    inviteUserForm,
    meetingEditForm,
    messages,
    requestedMeeting,
  } = state.app

  const meetings = allMeetingIds
    .map(id => meetingsById[id])
    .filter(meeting => isMeetingOnDate(meeting, selectedDate))
    .map(meeting => ({
      ...meeting,
      isOwnedByUser: meeting.owner.email === state.user.email }))

  const rooms = allRoomIds.map(id => roomsById[id])

  const meetingFormIsActive = isEditingMeeting || isCreatingMeeting

  return ({
    user: state.user,
    users: state.users,
    meetings,
    rooms,
    isCreatingMeeting,
    isEditingMeeting,
    isCancellingMeeting,
    isInvitingUser,
    inviteUserForm,
    meetingEditForm,
    messages,
    selectedDate,
    requestedMeeting,
    meetingFormIsActive,
  })
}

const mapDispatchToProps = dispatch => ({
  requestRooms: () => {
    // Why does `requestRooms` fetch Meetings?
    // TODO: Fetch meetings for selectedDate.
    dispatch(meetingsFetchStart())
  },
  populateMeetingCreateForm: (room, meeting) => {
    dispatch(populateMeetingCreateForm(room, meeting))
  },
  populateMeetingEditForm: (meeting) => {
    dispatch(populateMeetingEditForm(meeting))
  },
  onRemoveClick: (userEmail) => {
    dispatch(openRemoveUserDialog(userEmail))
  },
  fetchUsersList: () => {
    dispatch(usersFetchStart())
  },
  onLogoutClick: () => {
    dispatch(logout())
  },
  checkIsAuthorizedUser: (user) => {
    isAuthorizedUser(user, dispatch)
  },
})

const connected = connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardContainer)

export default connected
