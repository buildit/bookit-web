import calculateWidth from './calculateWidth';

describe('Tooltip offset calculator', () => {
  it('should calculate width for a 1 hour meeting', () => {
    expect(calculateWidth(1)).toBe(80);
  });

  it('should calculate width for a 15 minute meeting', () => {
    expect(calculateWidth(0.25)).toBe(18.5);
  });

  it('should calculate width for a 30 minute meeting', () => {
    expect(calculateWidth(0.5)).toBe(39);
  });

  it('should calculate width for a 30 minute meeting', () => {
    expect(calculateWidth(4)).toBe(326);
  });
});
