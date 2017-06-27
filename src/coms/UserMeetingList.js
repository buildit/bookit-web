import React from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'

import { makeCurrentUserMeetingIdsStateToProps } from '../selectors'
import { populateMeetingEditForm } from '../actions'

import UserMeetingItem from './UserMeetingItem'

export const UserMeetingList = ({ meetingIds = [], editMeeting }) => (
  <section>
    {
      meetingIds.map(meetingId =>
        <UserMeetingItem
          key={meetingId}
          meetingId={meetingId}
          onClick={() => editMeeting(meetingId)}
        />)
    }
  </section>
)

UserMeetingList.propTypes = {
  meetingIds: PropTypes.arrayOf(PropTypes.string),
  editMeeting: PropTypes.func,
}

const mapStateToProps = makeCurrentUserMeetingIdsStateToProps()

export default connect(
  mapStateToProps,
  { editMeeting: populateMeetingEditForm }
)(UserMeetingList)
