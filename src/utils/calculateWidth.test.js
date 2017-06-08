import calculateWidth from './calculateWidth'

describe('Tooltip offset calculator', () => {
  it('should return the meeting width (82) minus 3 to prevent overlap with hour markers', () => {
    expect(calculateWidth(1)).toBe(79)
  })

  it('should return proper width (82 * hours - 3) for fractional inputs (15 min meeting)', () => {
    expect(calculateWidth(0.25)).toBe(17.5)
  })

  it('should return proper width (82 * hours - 3) for fractional inputs (30 min meeting)', () => {
    expect(calculateWidth(0.5)).toBe(38)
  })

  it('should return proper width (82 * hours - 3) for multiple hour inputs', () => {
    expect(calculateWidth(4)).toBe(325)
  })
})
