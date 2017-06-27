import React from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'

import { List } from 'immutable'

import { makeRoomIdsStateToProps } from '../selectors'

import RoomMeetingRow from './RoomMeetingRow'

export const RoomMeetingRowList = ({ roomIds = List() }) => (
  <div>
    {
      roomIds.map(roomId =>
        <RoomMeetingRow key={roomId} roomId={roomId} />
      )
    }
  </div>
)

RoomMeetingRowList.propTypes = {
  roomIds: PropTypes.arrayOf(PropTypes.string),
}

const mapStateToProps = makeRoomIdsStateToProps()

export default connect(mapStateToProps)(RoomMeetingRowList)
