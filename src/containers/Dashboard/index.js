import React from 'react'
import PropTypes from 'prop-types'
import momentPropTypes from 'react-moment-proptypes'
import { connect } from 'react-redux'

import Agenda from '../../components/03-organisms/Agenda'
import Header from '../../components/02-molecules/Header'
import InfoPanel from '../InfoPanel'

import USER_SHAPE from '../../models/user'

import styles from './styles.scss'

import {
  isBooking,
  getMeetings,
  getRooms,
  getRequestedMeeting,
  getSelectedDate,
  getUser,
} from '../../selectors'

import {
  meetingsFetchStart,
  populateMeetingCreateForm,
  logout,
 } from '../../actions'

export class DashboardContainer extends React.Component {
  componentDidMount() {
    // This fetches meetings.
    // It should happen whenever `selectedDate` is updated.
    // It should not be called `requestRooms`, probably.
    this.props.requestRooms()
  }

  render() {
    const {
      user,
      meetings,
      rooms,
      onLogoutClick,
      location,
    } = this.props

    return (
      <div className={styles.dashboard}>
        <InfoPanel pathName={location.pathname} />
        <main>
          <Header user={user} logout={onLogoutClick} />
          <Agenda
            meetings={meetings}
            user={user}
            rooms={rooms}
            populateMeetingCreateForm={this.props.populateMeetingCreateForm}
            meetingFormIsActive={this.props.meetingFormIsActive}
          />
        </main>
      </div>
    )
  }
}

DashboardContainer.propTypes = {
  user: USER_SHAPE,
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
  meetingFormIsActive: PropTypes.bool.isRequired,
}

const mapStateToProps = state => ({
  user: getUser(state),
  meetings: getMeetings(state),
  rooms: getRooms(state),
  selectedDate: getSelectedDate(state),
  requestedMeeting: getRequestedMeeting(state),
  meetingFormIsActive: isBooking(state),
})


const mapDispatchToProps = dispatch => ({
  requestRooms: () => {
    // Why does `requestRooms` fetch Meetings?
    // TODO: Fetch meetings for selectedDate.
    dispatch(meetingsFetchStart())
  },
  populateMeetingCreateForm: (room, meeting) => {
    dispatch(populateMeetingCreateForm(room, meeting))
  },
  onLogoutClick: () => {
    dispatch(logout())
  },
})

const connected = connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardContainer)

export default connected
