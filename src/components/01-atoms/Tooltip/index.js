import React from 'react'
import PropTypes from 'prop-types'

import TooltipAnchor from './TooltipAnchor'
import TooltipContent from './TooltipContent'
import USER_SHAPE from '../../../models/user'

const Tooltip = props => (
  <div className={props.styles.tooltip} ref={props.tooltipRef}>
    <TooltipAnchor
      anchorContainerRef={props.anchorContainerRef}
      anchorRef={props.anchorRef}
      styles={props.styles}
    />
    <TooltipContent
      title={props.title}
      start={props.start}
      end={props.end}
      roomName={props.roomName}
      owner={props.owner}
      isUserAdmin={props.user.isAdmin}
      isOwnedByUser={props.isOwnedByUser}
      styles={props.styles}
      onEditClick={props.onEditClick}
    />
  </div>
)

Tooltip.propTypes = {
  title: PropTypes.string.isRequired,
  start: PropTypes.shape({}).isRequired,
  end: PropTypes.shape({}).isRequired,
  roomName: PropTypes.string.isRequired,
  user: USER_SHAPE,
  owner: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }),
  isOwnedByUser: PropTypes.bool.isRequired,
  tooltipRef: PropTypes.func.isRequired,
  anchorContainerRef: PropTypes.func.isRequired,
  anchorRef: PropTypes.func.isRequired,
  styles: PropTypes.shape({
    tooltip: PropTypes.string.isRequired,
  }).isRequired,
  onEditClick: PropTypes.func.isRequired,
}

export default Tooltip
