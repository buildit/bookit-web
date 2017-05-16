import React, { PropTypes } from 'react';

import { connect } from 'react-redux';

import moment from 'moment';

import Tooltip from '../../01-atoms/Tooltip';

import styles from './styles.scss';

import { cancelMeetingStart } from '../../../actions';

import calculateWidth from '../../../utils/calculateWidth';
import { calculateMeetingOffset } from '../../../utils/calculateMeetingOffset';

const ANCHOR_RANGE = 250;

class MeetingContainer extends React.Component {
  static propTypes = {
    roomTitle: PropTypes.string,
    meeting: PropTypes.shape({
      owner: PropTypes.shape({
        name: PropTypes.string,
        email: PropTypes.string,
      }),
      isOwnedByUser: PropTypes.bool,
      duration: PropTypes.number.isRequired,
      startTime: PropTypes.string,
      title: PropTypes.string,
    }).isRequired,
    cancelMeeting: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = { tooltipVisible: false, tooltipOffset: 0 };

    this.onClick = this.onClick.bind(this);
    this.onMove = this.onMove.bind(this);
    this.onOver = this.onOver.bind(this);
    this.onOut = this.onOut.bind(this);
  }

  onMove(event) {
    if (this.state.tooltipVisible) {
      const x = event.clientX - event.target.getBoundingClientRect().left;
      const meetingWidth = calculateWidth(this.props.meeting.duration);

      let excessWidth = 0;

      if (meetingWidth > ANCHOR_RANGE) {
        excessWidth = (meetingWidth - ANCHOR_RANGE) / 2;
      }

      if (x > ANCHOR_RANGE + excessWidth || x < excessWidth) {
        this.setState({ tooltipVisible: true, tooltipOffset: x < excessWidth ? 0 : ANCHOR_RANGE });
      } else {
        this.setState({ tooltipVisible: true, tooltipOffset: x - excessWidth });
      }
    }
  }

  onClick(event) {
    this.props.cancelMeeting(this.props.meeting);
    event.stopPropagation();
  }

  onOver() {
    this.setState({ tooltipVisible: true });
  }

  onOut() {
    this.setState({ tooltipVisible: false });
  }

  render() {
    const classNames = [styles.meeting];

    if (this.props.meeting.isOwnedByUser) {
      classNames.push(styles.isOwnedByUser);
    }

    if (this.state.tooltipVisible) {
      classNames.push(styles.hover);
    }

    const style = {
      width: calculateWidth(this.props.meeting.duration),
      left: calculateMeetingOffset(moment(this.props.meeting.startTime)),
    };

    return (
      <div
        className={classNames.join(' ')}
        style={style}
        onMouseMove={this.onMove}
        onMouseEnter={this.onOver}
        onMouseOut={this.onOut}
        onClick={this.onClick}
      >
        <Tooltip
          title={this.props.meeting.title}
          startTime={this.props.meeting.startTime}
          roomTitle={this.props.roomTitle}
          isOwnedByUser={this.props.meeting.isOwnedByUser}
          owner={this.props.meeting.owner}
          duration={this.props.meeting.duration}
          tooltipOffset={this.state.tooltipOffset}
          visible={this.state.tooltipVisible}
        />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  cancelMeeting: meeting => dispatch(cancelMeetingStart(meeting)),
});

const connected = connect(null, mapDispatchToProps)(MeetingContainer);

export default connected;
