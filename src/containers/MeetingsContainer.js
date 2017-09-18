import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'

import Moment from 'moment'

import {
  hasMeetingsForSelectedDate,
  getMeetingsForSelectedDate,
  getRoomIds,
  getSelectedDate,
} from '../selectors'

import {
  fetchMeetings,
  incrementDate,
  decrementDate,
} from '../actionCreators'

import BaseMeetingItem from './MeetingItem'
import BaseRoomItem from './RoomItem'

import withMeeting from './with-meeting'
import withRoom from './with-room'

const MeetingItem = withMeeting(BaseMeetingItem)
const RoomItem = withRoom(BaseRoomItem)

const formatDate = date => Moment(date).format('MM/DD/YYYY')

class MeetingsContainer extends Component {
  static propTypes = {
    fetchMeetings: PropTypes.func,
    incrementDate: PropTypes.func,
    decrementDate: PropTypes.func,
    selectedDate: PropTypes.string.isRequired,
    hasMeetingsForSelectedDate: PropTypes.bool,
    meetingIds: PropTypes.array.isRequired,
    roomIds: PropTypes.array.isRequired,
  }

  componentDidMount() {
    this.props.fetchMeetings(this.props.selectedDate)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedDate !== this.props.selectedDate) {
      this.props.fetchMeetings(nextProps.selectedDate)
    }
  }

  render() {
    const { selectedDate, incrementDate, decrementDate, meetingIds, roomIds, hasMeetingsForSelectedDate } = this.props

    return (
      <div>
        <button onClick={() => decrementDate()}>
          { formatDate(Moment(selectedDate).add(-1, 'day')) }
        </button>
        { '|' }
        <button onClick={() => incrementDate()}>
          { formatDate(Moment(selectedDate).add(1, 'day')) }
        </button>
        { !hasMeetingsForSelectedDate && <h1>LOADING...</h1> }
        { hasMeetingsForSelectedDate && <h1>SELECTED DATE: {selectedDate}</h1> }
        { roomIds.map(id => (<RoomItem key={id} id={id} />)) }
        { hasMeetingsForSelectedDate && meetingIds.map(id => (<MeetingItem key={id} id={id} />)) }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  selectedDate: getSelectedDate(state),
  hasMeetingsForSelectedDate: hasMeetingsForSelectedDate(state),
  meetingIds: getMeetingsForSelectedDate(state),
  roomIds: getRoomIds(state),
})

export default connect(
  mapStateToProps,
  { fetchMeetings, incrementDate, decrementDate }
)(MeetingsContainer)
