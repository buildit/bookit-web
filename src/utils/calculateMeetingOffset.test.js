import calculateMeetingOffset from './calculateMeetingOffset';

describe('Meeting offset calculator', () => {
  it('should handle undefined input', () => {
    expect(calculateMeetingOffset()).toBe(0);
  });

  it('should calculate offset for 1 am', () => {
    expect(calculateMeetingOffset('2017-04-05T01:00:00')).toBe(82);
  });

  it('should calculate offset for 1:30 am', () => {
    expect(calculateMeetingOffset('2017-04-05T01:30:00')).toBe(123);
  });

  it('should calculate offset for times after noon', () => {
    expect(calculateMeetingOffset('2017-04-05T14:30:00')).toBe(1189);
  });
});
