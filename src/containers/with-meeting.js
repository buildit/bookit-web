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

export default () => (WrappedComponent) => {
  // class BaseMeeting extends Component {
  //   constructor(props) {
  //     super(props)
  //   }
  //   render() {
  //     return <WrappedComponent {...this.props} />
  //   }
  // }

  const mapStateToProps = createPropsSelector({
    title: getMeetingTitle,
    start: getMeetingStart,
    end: getMeetingEnd,
    room: getMeetingRoomName,
  })

  const WithMeeting = connect(mapStateToProps)(WrappedComponent)

  WithMeeting.propTypes = {
    meetingId: PropTypes.string.isRequired,
  }

  return WithMeeting
}
