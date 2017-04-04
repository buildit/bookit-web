import React, { PropTypes } from 'react';

import moment from 'moment';

import Tooltip from '../Tooltip';

import styles from './styles.scss';

const WIDTH = 82;

const calculateWidth = (duration) => (WIDTH * duration) - 2;

const calculateOffset = (startTime) => {
  if (startTime === undefined) return 0;
  try {
    const startTimeObj = moment(startTime);
    return (WIDTH * (startTimeObj.hour() + (startTimeObj.minutes() / 60)));
  } catch (e) {
    return false;
  }
};

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
      left: calculateOffset(this.props.startTime),
    };

    return (
      <div
        className={classNames.join(' ')}
        style={style}
        onMouseEnter={this.onOver}
        onMouseOut={this.onOut}
      >
        <i />
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
