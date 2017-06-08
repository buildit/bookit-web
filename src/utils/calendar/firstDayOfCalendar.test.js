import moment from 'moment'
import firstDayOfCalendar from './firstDayOfCalendar'

describe('First day finder', () => {
  it('Returns the given date when the given date is the first date on the calendar', () => {
    const input = moment('2016-05-01')
    const expected = moment('2016-05-01')
    expect(firstDayOfCalendar(input).isSame(expected)).toEqual(true)
  })

  it('Handles a month where the first day falls on a Sunday', () => {
    const input = moment('2016-05-15')
    const expected = moment('2016-05-01')
    expect(firstDayOfCalendar(input).isSame(expected)).toEqual(true)
  })

  it('Handles a month where the first day does not fall on a Sunday', () => {
    const input = moment('2016-06-15')
    const expected = moment('2016-05-29')
    expect(firstDayOfCalendar(input).format('MM-DD-YYYY')).toEqual(expected.format('MM-DD-YYYY'))
  })
})
