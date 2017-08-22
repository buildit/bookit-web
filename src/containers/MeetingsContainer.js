import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'

import { getMeetingIds, getRoomIds, getSelectedDate } from '../selectors'

import { fetchMeetingsIfNeeded, selectDate } from '../actions'

import BaseMeetingItem from './MeetingItem'

import withMeeting from './with-meeting'

const MeetingItem = withMeeting(BaseMeetingItem)

class MeetingsContainer extends Component {
  static propTypes = {
    fetchMeetingsIfNeeded: PropTypes.func,
    selectDate: PropTypes.func,
    selectedDate: PropTypes.string.isRequired,
    meetingIds: PropTypes.array.isRequired,
  }

  componentDidMount() {
    this.props.fetchMeetingsIfNeeded()
  }

  handleChange = (nextDate) => {
    this.props.selectDate(nextDate)
  }

  render() {
    const { selectedDate, meetingIds } = this.props
    return (
      <div>
        { !meetingIds.length && <h1>LOADING...</h1> }
        { meetingIds.length && <h1>SELECTED DATE: {selectedDate}</h1> }
        { meetingIds.length && meetingIds.map(id => (<MeetingItem key={id} id={id} />)) }
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
  meetingIds: getMeetingIds(state),
  roomIds: getRoomIds(state),
})

export default connect(
  mapStateToProps,
  { fetchMeetingsIfNeeded, selectDate }
)(MeetingsContainer)
