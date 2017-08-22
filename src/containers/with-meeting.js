// import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { createPropsSelector } from 'reselect-immutable-helpers'

import {
  getMeetingTitle,
  getMeetingStart,
  getMeetingEnd,
  getMeetingRoomName,
} from '../selectors'

export default (WrappedComponent) => {
  const withMeeting = connect(
    createPropsSelector({
      title: getMeetingTitle,
      start: getMeetingStart,
      end: getMeetingEnd,
      room: getMeetingRoomName,
    })
  )(WrappedComponent)

  withMeeting.propTypes = {
    id: PropTypes.string.isRequired,
  }

  return withMeeting
}
