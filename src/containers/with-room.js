// import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { createPropsSelector } from 'reselect-immutable-helpers'

import { getRoomMeetings } from '../selectors'

import {
  getRoomName,
  getRoomEmail,
} from '../selectors'

export default (WrappedComponent) => {
  const withRoom = connect(
    createPropsSelector({
      meetings: getRoomMeetings,
      name: getRoomName,
      email: getRoomEmail,
    })
  )(WrappedComponent)

  withRoom.propTypes = {
    id: PropTypes.string.isRequired,
  }

  return withRoom
}
