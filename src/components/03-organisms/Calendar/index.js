import React from 'react';
import DatePicker from 'material-ui/DatePicker';
import injectTapEventPlugin from 'react-tap-event-plugin';
import styles from './styles.scss';

injectTapEventPlugin();

const Calendar = () => (
  <div className={styles.calendar}>
    <DatePicker
      defaultDate={new Date()}
      hintText="Quick Book"
      container="inline"
      hideCalendarDate={false}
      autoOk
    />
  </div>
);

export default Calendar;
