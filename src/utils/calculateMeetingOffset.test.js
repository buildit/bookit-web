import moment from 'moment'
import { calculateMeetingOffset } from './calculateMeetingOffset'

describe('Meeting offset calculator', () => {
  it('should handle undefined input', () => {
    expect(calculateMeetingOffset()).toBe(0)
  })

  it('should return the meeting width (82) multiplied by the start time (in hours)', () => {
    expect(calculateMeetingOffset(moment('2017-04-05T01:00:00'))).toBe(82)
  })

  it('should return the proper meeting offset when the start time has fractional hours', () => {
    expect(calculateMeetingOffset(moment('2017-04-05T01:30:00'))).toBe(123)
  })

  it('should calculate offset for times after noon (82 * start time)', () => {
    expect(calculateMeetingOffset(moment('2017-04-05T14:30:00'))).toBe(1189)
  })
})
