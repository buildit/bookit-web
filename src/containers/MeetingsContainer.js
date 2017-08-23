import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'

import { hasMeetings, getMeetingIds, getRoomIds, getSelectedDate } from '../selectors'

import { fetchMeetingsIfNeeded, selectDate } from '../actions'

import BaseMeetingItem from './MeetingItem'
import BaseRoomItem from './RoomItem'

import withMeeting from './with-meeting'
import withRoom from './with-room'

const MeetingItem = withMeeting(BaseMeetingItem)
const RoomItem = withRoom(BaseRoomItem)

class MeetingsContainer extends Component {
  static propTypes = {
    fetchMeetingsIfNeeded: PropTypes.func,
    selectDate: PropTypes.func,
    selectedDate: PropTypes.string.isRequired,
    hasMeetings: PropTypes.bool,
    meetingIds: PropTypes.array.isRequired,
    roomIds: PropTypes.array.isRequired,
  }

  componentDidMount() {
    this.props.fetchMeetingsIfNeeded()
  }

  handleChange = (nextDate) => {
    this.props.selectDate(nextDate)
  }

  render() {
    const { selectedDate, meetingIds, roomIds, hasMeetings } = this.props
    return (
      <div>
        { !hasMeetings && <h1>LOADING...</h1> }
        { hasMeetings && <h1>SELECTED DATE: {selectedDate}</h1> }
        { roomIds.map(id => (<RoomItem key={id} id={id} />)) }
        { hasMeetings && meetingIds.map(id => (<MeetingItem key={id} id={id} />)) }
      </div>
    )
  }
}

// const mapStateToProps = (state) => {
//   const { selectedDate, meetingsByDate } = state

//   const {
//     isFetching,
//     items: meetings,
//   } = meetingsByDate[selectedDate] || {
//     isFetching: true,
//     items: [],
//   }
// }

const mapStateToProps = state => ({
  selectedDate: getSelectedDate(state),
  hasMeetings: hasMeetings(state),
  meetingIds: getMeetingIds(state),
  roomIds: getRoomIds(state),
})

export default connect(
  mapStateToProps,
  { fetchMeetingsIfNeeded, selectDate }
)(MeetingsContainer)
