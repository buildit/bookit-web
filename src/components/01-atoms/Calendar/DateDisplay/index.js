import React, { PropTypes } from 'react';
import moment from 'moment';
import momentPropTypes from 'react-moment-proptypes';
import { connect } from 'react-redux';
import styles from './styles.scss';
import { selectDate } from '../../../../actions';

const DateDisplay = ({ date, handleTodayClick, forwardHandler, backHandler }) => {
  let today = null;
  if (!date.isSame(moment(), 'day')) {
    today = (<div
      className={styles.today}
      onClick={() => handleTodayClick()}
    >
      Today
    </div>);
  }
  return (
    <div className={styles.dateDisplay}>
      {today}
      <div className={styles.past} onClick={backHandler(date)} />
      <div className={styles.date}>
        <div className={styles.month}>
          {date.format('MMMM')}
        </div>
        <div className={styles.day}>
          {date.format('dddd D')}
        </div>
      </div>
      <div className={styles.future} onClick={forwardHandler(date)} />
    </div>
  );
};

DateDisplay.propTypes = {
  date: momentPropTypes.momentObj,
  handleClick: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  handleTodayClick: () => dispatch(selectDate(moment())),
});

export default connect(null, mapDispatchToProps)(DateDisplay);
