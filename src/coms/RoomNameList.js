import React from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'

import { List } from 'immutable'

import { makeRoomIdsStateToProps } from '../selectors'

import RoomNameItem from './RoomNameItem'

export const RoomNameList = ({ roomIds = List() }) => (
  <div>
    {
      roomIds.map(roomId =>
        <RoomNameItem key={roomId} roomId={roomId} />
      )
    }
  </div>
)

RoomNameList.propTypes = {
  roomIds: PropTypes.arrayOf(PropTypes.string),
}

const mapStateToProps = makeRoomIdsStateToProps()

export default connect(mapStateToProps)(RoomNameList)
