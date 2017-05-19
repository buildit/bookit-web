import React, { PropTypes } from 'react';

import { connect } from 'react-redux';

import Tooltip from '../../01-atoms/Tooltip';

import { openCancellationDialog } from '../../../actions';

import calculateWidth from '../../../utils/calculateWidth';
import { calculateMeetingOffset } from '../../../utils/calculateMeetingOffset';

import styles from './styles.scss';

class MeetingContainer extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
  }

  /** Prevents the onclick handler of the parent element from firing */
  handleClick(event) {
    this.props.onClick(this.props.meeting);
    event.stopPropagation();
  }

  /**
   * Handles tooltip anchor positioning.
   *
   * Is actually not bound to the meeting element until the mouse
   * enters it, and gets removed when the mouse leaves said element.
   * @param  {Event} event
   */
  handleMouseMove(event) {
    const mRect = this.$meeting.getBoundingClientRect();
    const tlRect = document.getElementById('timelines').getBoundingClientRect();

    let offsetLeft = 0;

    if (mRect.left < tlRect.left) {
      offsetLeft = (tlRect.left - mRect.left);
    }

    const anchorLeft = Math.max(0, ((event.clientX - mRect.left) - offsetLeft));
    this.$anchor.style.left = `${Math.min(anchorLeft, (this.inlineStyle.width - 10))}px`;
  }

  /**
   * Handles visibility and positioning of the tooltip on the meeting
   *
   * Additionally binds the mousemove event handler, which adds
   * the 'fancy' feature of the tooltip anchor following the cursor
   * within the bounds of the meeting element.
   * @param  {Event} event
   */
  handleMouseOver(event) {
    const mRect = this.$meeting.getBoundingClientRect();
    const tlRect = document.getElementById('timelines').getBoundingClientRect();

    let effectiveWidth = this.inlineStyle.width;
    let effectiveLeft = 0;

    if (mRect.left < tlRect.left) {
      effectiveWidth = mRect.width - (tlRect.left - mRect.left);
      effectiveLeft = (tlRect.left - mRect.left);
    }

    this.$tooltip.className = styles['tooltip--visible'];
    this.$tooltip.style.left = `${effectiveLeft}px`;

    this.$meeting.addEventListener('mousemove', this.handleMouseMove);

    this.$anchorContainer.style.width = `${effectiveWidth + 10}px`;
    this.$anchorContainer.style.marginLeft = 0;
  }

  /**
   * Removes tooltip visibility in a most cavalier fashion.
   *
   * Additionally removes the mousemove listener that was previously
   * bound to the meeting element to prevent superfluous handlers.
   * @param  {Event} event
   */
  handleMouseOut(event) {
    this.$tooltip.style.left = null;
    this.$tooltip.className = styles.tooltip;
    this.$meeting.removeEventListener('mousemove', this.handleMouseMove);
  }

  get inlineStyle() {
    const { meeting: { duration, start } } = this.props;
    const width = calculateWidth(duration);
    const left = calculateMeetingOffset(start);
    return { width, left };
  }

  render() {
    const { meeting } = this.props;

    return (
      <div
        className={styles.meeting}
        style={this.inlineStyle}
        onClick={this.handleClick}
        onMouseOver={this.handleMouseOver}
        onMouseOut={this.handleMouseOut}
        ref={el => { this.$meeting = el; }}
      >
        <Tooltip
          {...meeting}
          tooltipRef={el => { this.$tooltip = el; }}
          anchorContainerRef={el => { this.$anchorContainer = el; }}
          anchorRef={el => { this.$anchor = el; }}
          styles={styles}
        />
      </div>
    );
  }
}

MeetingContainer.propTypes = {
  meeting: PropTypes.shape({}).isRequired,
  onClick: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  onClick: meeting => dispatch(openCancellationDialog(meeting)),
});

const connected = connect(null, mapDispatchToProps)(MeetingContainer);

export default connected;
