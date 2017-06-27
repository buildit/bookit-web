import React from 'react'
import PropTypes from 'prop-types'

import MeetingItem from './MeetingItem'

class MeetingList extends React.Component {
  static propTypes = {
    meetingIds: PropTypes.arrayOf(PropTypes.string),
  }

  render() {
    const { meetingIds = [] } = this.props
    return (
      <div>{ meetingIds.map(meetingId => <MeetingItem key={meetingId} meetingId={meetingId} />) }</div>
    )
  }
}

export default MeetingList
