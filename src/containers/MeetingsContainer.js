import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'

import { getMeetings, getSelectedDate } from '../selectors'

import { fetchMeetingsIfNeeded, selectDate } from '../actions'

import BaseMeetingItem from './MeetingItem'

import withMeeting from './with-meeting'

const MeetingItem = withMeeting()(BaseMeetingItem)

class MeetingsContainer extends Component {
  static propTypes = {
    fetchMeetingsIfNeeded: PropTypes.func,
    selectDate: PropTypes.func,
    selectedDate: PropTypes.string.isRequired,
    meetings: PropTypes.array.isRequired,
  }

  componentDidMount() {
    this.props.fetchMeetingsIfNeeded()
  }

  handleChange = (nextDate) => {
    this.props.selectDate(nextDate)
  }

  render() {
    const { selectedDate, meetings } = this.props
    return (
      <div>
        <h1>SELECTED DATE: {selectedDate}</h1>
        {!meetings.count() &&
          <h2>NO MEETINGS</h2>
        }
        { meetings.keySeq().map(id => (<MeetingItem key={id} meetingId={id} />)) }
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
  meetings: getMeetings(state),
})

export default connect(
  mapStateToProps, {
    fetchMeetingsIfNeeded,
    selectDate,
  })(MeetingsContainer)
