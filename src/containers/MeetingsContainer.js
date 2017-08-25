import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'

import Moment from 'moment'

import { hasMeetings, getMeetingIdsForSelectedDate, getRoomIds, getSelectedDate } from '../selectors'

import { fetchMeetings, selectDate } from '../actions'

import BaseMeetingItem from './MeetingItem'
import BaseRoomItem from './RoomItem'

import withMeeting from './with-meeting'
import withRoom from './with-room'

const MeetingItem = withMeeting(BaseMeetingItem)
const RoomItem = withRoom(BaseRoomItem)

class MeetingsContainer extends Component {
  static propTypes = {
    fetchMeetings: PropTypes.func,
    selectDate: PropTypes.func,
    selectedDate: PropTypes.string.isRequired,
    hasMeetings: PropTypes.bool,
    meetingIds: PropTypes.array.isRequired,
    roomIds: PropTypes.array.isRequired,
  }

  componentDidMount() {
    this.props.fetchMeetings(this.props.selectedDate)
  }

  handleChange = (nextDate) => {
    this.props.selectDate(nextDate)
  }

  render() {
    const { selectedDate, selectDate, meetingIds, roomIds, hasMeetings } = this.props
    const mutateDate = change => Moment(selectedDate).add(change, 'day').format('YYYY-MM-DD')

    return (
      <div>
        <button onClick={() => selectDate(mutateDate(-1))}>
          Previous Day
        </button>
        { '|' }
        <button onClick={() => selectDate(mutateDate(1))}>
          Next Day
        </button>
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
  meetingIds: getMeetingIdsForSelectedDate(state),
  roomIds: getRoomIds(state),
})

export default connect(
  mapStateToProps,
  { fetchMeetings, selectDate }
)(MeetingsContainer)
