import firstDayOfCalendar from './firstDayOfCalendar'
import firstDayOfEachWeek from './firstDayOfEachWeek'

const calendar = (selectedDate) => {
  const firstDay = firstDayOfCalendar(selectedDate)
  const sundays = firstDayOfEachWeek(firstDay, selectedDate.month())

  const month = sundays.map((sunday) => {
    const week = []
    const date = sunday
    for (let i = 0; i < 7; i += 1) {
      const todaysDate = date.clone()
      week.push({
        date: todaysDate,
        isSelectedDate: todaysDate.isSame(selectedDate, 'day'),
        isInCurrentMonth: todaysDate.isSame(selectedDate, 'month'),
        isToday: todaysDate.isSame(new Date(), 'day'),
      })
      date.add(1, 'day')
    }
    return week
  })

  return month
}

export default calendar
