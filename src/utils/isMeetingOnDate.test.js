import moment from 'moment'
import isMeetingOnDate from './isMeetingOnDate'

describe('isMeetingOnDate util', () => {
  let selectedDate

  beforeEach(() => {
    selectedDate = moment.utc('2017-05-20T12:00:00.000+00:00')
  })

  it('returns true for a meeting that starts on the selected date', () => {
    const meeting = {
      start: '2017-05-20T23:00:00.000+00:00',
      end: '2017-05-21T01:00:00.000+00:00',
    }
    expect(isMeetingOnDate(meeting, selectedDate)).toBeTruthy()
  })

  it('returns true for a meeting that ends on the selected date', () => {
    const meeting = {
      start: '2017-05-19T23:00:00.000+00:00',
      end: '2017-05-20T01:00:00.000+00:00',
    }
    expect(isMeetingOnDate(meeting, selectedDate)).toBeTruthy()
  })

  it('returns false for a meeting that happens before the selected date', () => {
    const meeting = {
      start: '2017-05-19T22:00:00.000+00:00',
      end: '2017-05-19T23:00:00.000+00:00',
    }
    expect(isMeetingOnDate(meeting, selectedDate)).toBeFalsy()
  })

  it('returns false for a meeting that happens after the selected date', () => {
    const meeting = {
      start: '2017-05-21T01:00:00.000+00:00',
      end: '2017-05-21T02:00:00.000+00:00',
    }
    expect(isMeetingOnDate(meeting, selectedDate)).toBeFalsy()
  })
})
