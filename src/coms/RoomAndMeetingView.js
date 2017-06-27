import React from 'react'

import RoomMeetingRowList from './RoomMeetingRowList'
import RoomNameList from './RoomNameList'

import UserMeetingList from './UserMeetingList'

class RoomAndMeetingView extends React.Component {
  render() {
    return (
      <section>
        <div className="column">
          <RoomNameList />
        </div>
        <div className="column">
          <RoomMeetingRowList />
          <UserMeetingList />
        </div>
      </section>
    )
  }
}

export default RoomAndMeetingView
