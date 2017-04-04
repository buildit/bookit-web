import React, { PropTypes } from 'react';

import moment from 'moment';

import Tooltip from '../../01-atoms/Tooltip';

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

    this.state = { tooltipVisible: false, tooltipOffset: 0 };

    this.onMove = this.onMove.bind(this);
    this.onOver = this.onOver.bind(this);
    this.onOut = this.onOut.bind(this);
  }

  onMove(event) {
    if (!this.state.tooltipVisible) {
      return false;
    }
    const x = event.clientX - event.target.getBoundingClientRect().left;
    // console.log('MOUSE MOVE!', x);
    this.setState({ tooltipVisible: true, tooltipOffset: x });
  }

  onOver(event) {
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
        onMouseMove={this.onMove}
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
  startTime: PropTypes.string,
};

export default Meeting;
