import calculateTooltipOffset from './calculateTooltipOffset';

describe('Tooltip offset calculator', () => {
  it('should calculate offset for a 2 hour meeting', () => {
    expect(calculateTooltipOffset(2)).toBe(-54);
  });

  it('should calculate offset a 3.5 hour meeting', () => {
    expect(calculateTooltipOffset(3.5)).toBe(7.5);
  });

  it('should calculate offset for a 15 minute meeting', () => {
    expect(calculateTooltipOffset(0.25)).toBe(-125.75);
  });
});
