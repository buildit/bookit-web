import React from 'react';
import DatePicker from 'material-ui/DatePicker';
import injectTapEventPlugin from 'react-tap-event-plugin';
import styles from './styles.scss';

injectTapEventPlugin();

const Calendar = () => (
  <div className={styles.calendar}>
    <DatePicker
      hintText="Quick Book"
      container="inline"
      hideCalendarDate={false}
    />
  </div>
);

export default Calendar;

/*
POTENTIALLY USEFUL PROPS
see: http://www.material-ui.com/#/components/date-picker

dialogContainerStyle -- Maybe use to keep open?
hideCalendarDate
onChange
shouldDisableDate
style
textFieldStyle
value
*/
