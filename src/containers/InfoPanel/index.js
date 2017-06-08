import React from 'react'
import PropTypes from 'prop-types'
import momentPropTypes from 'react-moment-proptypes'

import { connect } from 'react-redux'

import {
  populateMeetingEditForm,
 } from '../../actions'

import Calendar from '../../components/01-atoms/Calendar'
import Messages from '../../components/02-molecules/Messages'
import ReservationList from '../../components/02-molecules/ReservationList'
import RecentlyAddedUsersTable from '../../components/02-molecules/RecentlyAddedUsersTable'
import MeetingCancel from '../../components/02-molecules/MeetingCancel'
import MeetingForm from '../MeetingForm'
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
     users,
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
      content.push(<RecentlyAddedUsersTable key="4" users={users} />)
    }

    content.push(<Messages key="5" messages={messages} />)

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
    users: state.users,
  })
}

const mapDispatchToProps = dispatch => ({
  handleReservationEditClick: (meeting) => {
    dispatch(populateMeetingEditForm(meeting))
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
  messages: PropTypes.arrayOf(PropTypes.string),
  handleReservationEditClick: PropTypes.func.isRequired,
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
