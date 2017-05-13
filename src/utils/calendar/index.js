import firstDayOfCalendar from './firstDayOfCalendar';
import firstDayOfEachWeek from './firstDayOfEachWeek';

const calendar = selectedDate => {
  const firstDay = firstDayOfCalendar(selectedDate);
  const sundays = firstDayOfEachWeek(firstDay, selectedDate.month());

  const month = sundays.map(sunday => {
    const week = [];
    const date = sunday;
    for (let i = 0; i < 7; i += 1) {
      week.push({
        date: date.clone(),
        isSelectedDate: date.isSame(selectedDate),
        isInCurrentMonth: date.isSame(selectedDate, 'month'),
      });
      date.add(1, 'day');
    }
    return week;
  });

  return month;
};

export default calendar;
