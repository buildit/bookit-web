import calculateWidth from './calculateWidth'

const TOOLTIP_WIDTH = 270

const calculateTooltipOffset = duration => (
  (calculateWidth(duration) / 2) - (TOOLTIP_WIDTH / 2)
)

export default calculateTooltipOffset
