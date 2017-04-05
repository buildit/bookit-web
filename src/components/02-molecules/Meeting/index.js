import React, { PropTypes } from 'react';

import Tooltip from '../../01-atoms/Tooltip';

import styles from './styles.scss';

import calculateWidth from '../../../utils/calculateWidth';
import calculateMeetingOffset from '../../../utils/calculateMeetingOffset'

class Meeting extends React.Component {
  constructor(props) {
    super(props);

    this.state = { tooltipVisible: false };

    this.onOver = this.onOver.bind(this);
    this.onOut = this.onOut.bind(this);
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

    const style = {
      width: calculateWidth(this.props.duration),
      left: calculateMeetingOffset(this.props.startTime),
    };

    return (
      <div
        className={classNames.join(' ')}
        style={style}
        onMouseEnter={this.onOver}
        onMouseOut={this.onOut}
      >
        <Tooltip
          title="A Meeting with Batman"
          startTime={this.props.startTime}
          roomTitle={this.props.roomTitle}
          isOwnedByUser={this.props.isOwnedByUser}
          owner={this.props.owner}
          duration={this.props.duration}
          visible={this.state.tooltipVisible}
        />
      </div>
    );
  }
}

Meeting.propTypes = {
  roomTitle: PropTypes.string,
  owner: PropTypes.shape,
  isOwnedByUser: PropTypes.bool,
  duration: PropTypes.number.isRequired,
  startTime: PropTypes.string,
};

export default Meeting;
