import moment from 'moment'
import firstDayOfEachWeek from './firstDayOfEachWeek'

describe('First day of each week finder', () => {
  it('Handles a month where the first day falls on a Sunday', () => {
    const firstDayOfCalendar = moment('2016-05-01')
    const mayIndex = 4
    const sundays = firstDayOfEachWeek(firstDayOfCalendar, mayIndex)

    expect((sundays[0].format('YYYY-MM-DD'))).toEqual('2016-05-01')
    expect((sundays[1].format('YYYY-MM-DD'))).toEqual('2016-05-08')
    expect((sundays[2].format('YYYY-MM-DD'))).toEqual('2016-05-15')
    expect((sundays[3].format('YYYY-MM-DD'))).toEqual('2016-05-22')
    expect((sundays[4].format('YYYY-MM-DD'))).toEqual('2016-05-29')
  })

  it('Handles a month where the first day does not fall on a Sunday', () => {
    const firstDayOfCalendar = moment('2016-05-29')
    const juneIndex = 5
    const sundays = firstDayOfEachWeek(firstDayOfCalendar, juneIndex)

    expect((sundays[0].format('YYYY-MM-DD'))).toEqual('2016-05-29')
    expect((sundays[1].format('YYYY-MM-DD'))).toEqual('2016-06-05')
    expect((sundays[2].format('YYYY-MM-DD'))).toEqual('2016-06-12')
    expect((sundays[3].format('YYYY-MM-DD'))).toEqual('2016-06-19')
    expect((sundays[4].format('YYYY-MM-DD'))).toEqual('2016-06-26')
  })
})
