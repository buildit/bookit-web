import React from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'

import Button from '../../01-atoms/Button'

import { cancelMeetingStart, abortUiAction } from '../../../actions'

import { getRequestedMeeting, getRequestedMeetingRoom } from '../../../selectors'

import styles from './styles.scss'

export class MeetingCancel extends React.Component {
  static propTypes = {
    meeting: PropTypes.shape({
      owner: PropTypes.shape({
        name: PropTypes.string,
        email: PropTypes.string,
      }),
      isOwnedByUser: PropTypes.bool,
      duration: PropTypes.number,
      startTime: PropTypes.string,
      title: PropTypes.string,
    }).isRequired,
    room: PropTypes.shape({
      name: PropTypes.string,
      email: PropTypes.string,
    }),
    abortUiAction: PropTypes.func.isRequired,
    cancelMeeting: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)

    this.onConfirmCancel = this.onConfirmCancel.bind(this)
    this.onCancelCancel = this.onCancelCancel.bind(this)
  }

  onConfirmCancel() {
    this.props.cancelMeeting(this.props.meeting, this.props.room)
  }

  onCancelCancel() {
    this.props.abortUiAction()
  }

  render() {
    return (
      <div className={styles.cancelMeeting}>
        <p>Are you sure you want to cancel this meeting?</p>
        <div>
          <Button onClick={this.onConfirmCancel} content="Yes" />
          <Button onClick={this.onCancelCancel} content="No" />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  meeting: getRequestedMeeting(state),
  room: getRequestedMeetingRoom(state),
})

const mapDispatchToProps = dispatch => ({
  closeCancellationDialog: () => dispatch(abortUiAction()),
  cancelMeeting: (meeting, room) => dispatch(cancelMeetingStart(meeting, room)),
})

const connected = connect(
  mapStateToProps,
  mapDispatchToProps
)(MeetingCancel)

export default connected
