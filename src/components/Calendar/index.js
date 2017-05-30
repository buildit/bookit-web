import React from 'react';
import momentPropTypes from 'react-moment-proptypes';
import Week from './Week';
import DateDisplay from './01-Atoms/DateDisplay';
import DayNames from './01-Atoms/DayNames';
import calendar from 'utils/calendar';
import styles from './styles.scss';
import { calendar as config } from './config';

const style = {
  minWidth: `${config.minWidth}px`,
};

const Calendar = ({ selectedDate }) => (
  <div
    className={styles.calendar}
    style={style}
  >
    <DateDisplay date={selectedDate} />
    <DayNames />
    {calendar(selectedDate)
        .map((week, index) => <Week key={index} week={week} />)}
  </div>
);

Calendar.propTypes = {
  selectedDate: momentPropTypes.momentObj,
};

export default Calendar;
