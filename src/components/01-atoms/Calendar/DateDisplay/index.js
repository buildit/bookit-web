import React, { PropTypes } from 'react';
import moment from 'moment';
import momentPropTypes from 'react-moment-proptypes';
import { connect } from 'react-redux';
import styles from './styles.scss';
import { selectDate } from '../../../../actions';

const DateDisplay = ({ date, handleClick }) => (
  <div className={styles.dateDisplay}>
    <div
      className={styles.today}
      onClick={() => handleClick()}
    >
      { date.isSame(moment(), 'day') ? '' : 'Today' }
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
  handleClick: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  handleClick: () => dispatch(selectDate(moment())),
});

export default connect(null, mapDispatchToProps)(DateDisplay);
