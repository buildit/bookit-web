// Given the first day in the calendar month (i.e. the date that
// should appear in the upper left position of a calendar)
// return the first day of the week for all weeks in that calendar month.

const firstDayOfEachWeek = (firstDayOfMonth, monthIndex) => {
  const date = firstDayOfMonth.clone()
  const firstDays = []
  let done = false

  do {
    firstDays.push(date.clone())
    date.add(1, 'week')
    done = monthIndex !== date.month()
  } while (!done)

  return firstDays
}

export default firstDayOfEachWeek
