import React from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'

import { makeRoomNameStateToProps } from '../selectors'

const RoomNameItem = props => <h2>{ props.name }</h2>

RoomNameItem.propTypes = {
  name: PropTypes.string,
}

export default connect(makeRoomNameStateToProps)(RoomNameItem)
