import React from 'react';
import moment from 'moment';
import momentPropTypes from 'react-moment-proptypes';
import styles from './styles.scss';

const DateDisplay = ({ date }) => (
  <div className={styles.dateDisplay}>
    <div className={styles.today}>
      { date.isSame(moment(), 'day') ? 'Today' : '' }
    </div>
    <div className={styles.past} />
    <div className={styles.date}>
      <div className={styles.month}>
        {date.format('MMMM')}
      </div>
      <div className={styles.day}>
        {date.format('dddd D')}
      </div>
    </div>
    <div className={styles.future} />
  </div>
);

DateDisplay.propTypes = {
  date: momentPropTypes.momentObj,
};

export default DateDisplay;
