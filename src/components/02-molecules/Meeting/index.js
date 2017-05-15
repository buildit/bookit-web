import React, { PropTypes } from 'react';

import Tooltip from '../../01-atoms/Tooltip';

import styles from './styles.scss';

import calculateWidth from '../../../utils/calculateWidth';
import { calculateMeetingOffset } from '../../../utils/calculateMeetingOffset';

const ANCHOR_RANGE = 250;

class Meeting extends React.Component {
  constructor(props) {
    super(props);

    this.state = { tooltipVisible: false, tooltipOffset: 0 };

    this.onMove = this.onMove.bind(this);
    this.onOver = this.onOver.bind(this);
    this.onOut = this.onOut.bind(this);
  }

  onMove(event) {
    if (this.state.tooltipVisible) {
      const x = event.clientX - event.target.getBoundingClientRect().left;
      const meetingWidth = calculateWidth(this.props.duration);
      let excessWidth = 0;
      if (meetingWidth > TOOLTIP_ANCHOR_RANGE) {
        excessWidth = (meetingWidth - TOOLTIP_ANCHOR_RANGE) / 2;
      }
      if (x > TOOLTIP_ANCHOR_RANGE + excessWidth || x < excessWidth) {
        this.setState({ tooltipVisible: true, tooltipOffset: x < excessWidth ? 0 : ANCHOR_RANGE });
      } else {
        this.setState({ tooltipVisible: true, tooltipOffset: x - excessWidth });
      }
    }
  }

  onOver() {
    this.setState({ tooltipVisible: true });
  }

  onOut() {
    this.setState({ tooltipVisible: false });
  }

  render() {
    const classNames = [styles.meeting];

    if (this.props.isOwnedByUser) {
      classNames.push(styles.isOwnedByUser);
    }

    if (this.state.tooltipVisible) {
      classNames.push(styles.hover);
    }

    const style = {
      width: calculateWidth(this.props.duration),
      left: calculateMeetingOffset(this.props.startTime),
    };

    return (
      <div
        className={classNames.join(' ')}
        style={style}
        onMouseMove={this.onMove}
        onMouseEnter={this.onOver}
        onMouseOut={this.onOut}
        onClick={event => event.stopPropagation()}
      >
        <Tooltip
          title={this.props.title}
          startTime={this.props.startTime}
          roomTitle={this.props.roomTitle}
          isOwnedByUser={this.props.isOwnedByUser}
          owner={this.props.owner}
          duration={this.props.duration}
          tooltipOffset={this.state.tooltipOffset}
          visible={this.state.tooltipVisible}
        />
      </div>
    );
  }
}

Meeting.propTypes = {
  roomTitle: PropTypes.string,
  owner: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
  }),
  isOwnedByUser: PropTypes.bool,
  duration: PropTypes.number.isRequired,
  startTime: PropTypes.shape({}),
  title: PropTypes.string,
};

export default Meeting;
