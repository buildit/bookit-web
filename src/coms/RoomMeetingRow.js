import React from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'

import { makeRoomMeetingIdsStateToProps } from '../selectors'

import RoomMeetingItem from './RoomMeetingItem'

import RoomMeetingRowStyles from './RoomMeetingRow.scss'

export const RoomMeetingRow = ({ meetingIds = [] }) => (
  <div className={RoomMeetingRowStyles.room}>
    <div className={RoomMeetingRowStyles.timeline}>
      <div className={RoomMeetingRowStyles.meetings}>
        {
          meetingIds.map(meetingId =>
            <RoomMeetingItem
              key={meetingId}
              meetingId={meetingId}
            />)
        }
      </div>
    </div>
  </div>
)

RoomMeetingRow.propTypes = {
  meetingIds: PropTypes.arrayOf(PropTypes.string),
}

const mapStateToProps = makeRoomMeetingIdsStateToProps()

export default connect(mapStateToProps)(RoomMeetingRow)
