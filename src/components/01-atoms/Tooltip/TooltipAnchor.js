import React from 'react'
import PropTypes from 'prop-types'

const TooltipAnchor = ({ anchorContainerRef, anchorRef, styles }) => (
  <div className={styles.anchorContainer} ref={anchorContainerRef}>
    <div className={styles.anchor} ref={anchorRef} />
  </div>
)

TooltipAnchor.propTypes = {
  anchorContainerRef: PropTypes.func.isRequired,
  anchorRef: PropTypes.func.isRequired,
  styles: PropTypes.shape({}).isRequired,
}

export default TooltipAnchor
