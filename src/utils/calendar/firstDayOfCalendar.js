// Given a date in Moment format,
// return the date that should appear in the upper left position of a calendar
// month that contains that date.

const firstDayOfCalendar = date => date.clone().startOf('month').day('Sunday')

export default firstDayOfCalendar
