import React from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'

import Tooltip from '../../01-atoms/Tooltip'

import { populateMeetingEditForm } from '../../../actions'

import { getRequestedMeetingId } from '../../../selectors'

import calculateWidth from '../../../utils/calculateWidth'
import { calculateMeetingOffset } from '../../../utils/calculateMeetingOffset'

import USER_SHAPE from '../../../models/user'

import styles from './styles.scss'

export const TIMELINE_WIDTH = 1968

export class Meeting extends React.Component {
  constructor(props) {
    super(props)

    this.handleMouseMove = this.handleMouseMove.bind(this)
    this.handleMouseOver = this.handleMouseOver.bind(this)
    this.handleMouseOut = this.handleMouseOut.bind(this)
  }

  /**
   * Handles tooltip anchor positioning.
   *
   * Is actually not bound to the meeting element until the mouse
   * enters it, and gets removed when the mouse leaves said element.
   * @param  {Event} event
   */
  handleMouseMove(event) {
    const mRect = this.$meeting.getBoundingClientRect()
    const tlRect = document.getElementById('timelines').getBoundingClientRect()

    let offsetLeft = 0

    if (mRect.left < tlRect.left) {
      offsetLeft = (tlRect.left - mRect.left)
    }

    const anchorLeft = Math.max(0, ((event.clientX - mRect.left) - offsetLeft))
    this.$anchor.style.left = `${Math.min(anchorLeft, (this.inlineStyle.width - 10))}px`
  }

  /**
   * Handles visibility and positioning of the tooltip on the meeting
   *
   * Additionally binds the mousemove event handler, which adds
   * the 'fancy' feature of the tooltip anchor following the cursor
   * within the bounds of the meeting element.
   * @param  {Event} event
   */
  handleMouseOver() {
    const mRect = this.$meeting.getBoundingClientRect()
    const tlRect = document.getElementById('timelines').getBoundingClientRect()

    let effectiveWidth = this.inlineStyle.width
    let effectiveLeft = 0

    if (mRect.left < tlRect.left) {
      effectiveWidth = mRect.width - (tlRect.left - mRect.left)
      effectiveLeft = (tlRect.left - mRect.left)
    }

    this.$tooltip.className = styles.tooltipVisible
    this.$tooltip.style.left = `${effectiveLeft}px`

    this.$meeting.addEventListener('mousemove', this.handleMouseMove)

    this.$anchorContainer.style.width = `${effectiveWidth + 10}px`
    this.$anchorContainer.style.marginLeft = 0
  }

  /**
   * Removes tooltip visibility in a most cavalier fashion.
   *
   * Additionally removes the mousemove listener that was previously
   * bound to the meeting element to prevent superfluous handlers.
   * @param  {Event} event
   */
  handleMouseOut() {
    this.$tooltip.style.left = null
    this.$tooltip.className = styles.tooltip
    this.$meeting.removeEventListener('mousemove', this.handleMouseMove)
  }

  get inlineStyle() {
    const { meeting: { duration, start } } = this.props
    let width = calculateWidth(duration)
    const left = calculateMeetingOffset(start)
    // See if meeting will extend beyond the end of the timeline
    // If so, reduce the width such that it does not
    const totalWidth = width + left
    if (totalWidth > TIMELINE_WIDTH) {
      width -= ((totalWidth) - TIMELINE_WIDTH)
    }
    return { width, left }
  }

  render() {
    const { meeting, onEditClick, requestedMeetingId, user } = this.props
    const isSelected = meeting.id === requestedMeetingId
    const classNames = [styles.meeting]

    if (isSelected) {
      classNames.push(styles.isSelected)
    }

    if (this.props.meeting.isOwnedByUser) {
      classNames.push(styles.isOwnedByUser)
    }

    return (
      <div
        className={classNames.join(' ')}
        style={this.inlineStyle}
        onClick={event => event.stopPropagation()}
        onMouseOver={this.handleMouseOver}
        onMouseOut={this.handleMouseOut}
        ref={(el) => { this.$meeting = el }}
      >
        <Tooltip
          {...meeting}
          user={user}
          tooltipRef={(el) => { this.$tooltip = el }}
          anchorContainerRef={(el) => { this.$anchorContainer = el }}
          anchorRef={(el) => { this.$anchor = el }}
          styles={styles}
          onEditClick={() => onEditClick(meeting)}
        />
      </div>
    )
  }
}

Meeting.propTypes = {
  user: USER_SHAPE,
  meeting: PropTypes.shape({ isOwnedByUser: PropTypes.bool }).isRequired,
  onEditClick: PropTypes.func.isRequired,
  requestedMeetingId: PropTypes.string,
}

const mapDispatchToProps = dispatch => ({
  onEditClick: meeting => dispatch(populateMeetingEditForm(meeting)),
})

const mapStateToProps = state => ({
  requestedMeetingId: getRequestedMeetingId(state),
})

const connected = connect(mapStateToProps, mapDispatchToProps)(Meeting)

export default connected
