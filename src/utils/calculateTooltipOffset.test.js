import calculateTooltipOffset from './calculateTooltipOffset'

describe('Tooltip offset calculator', () => {
  it('should return the width of the meeting divided by 2, minus the tooltip width divided by 2 (to center the tooltip)', () => {
    expect(calculateTooltipOffset(2)).toBe(-54.5)
  })

  it('should properly calculate the offset (width/2 - tooltipwidth/2) for multiple hour inputs', () => {
    expect(calculateTooltipOffset(3.5)).toBe(7)
  })

  it('should properly calculate the offset (width/2 - tooltipwidth/2) for fractional inputs', () => {
    expect(calculateTooltipOffset(0.25)).toBe(-126.25)
  })
})
