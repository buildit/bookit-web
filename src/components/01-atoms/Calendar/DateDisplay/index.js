import React from 'react'
import PropTypes from 'prop-types'

import moment from 'moment'
import momentPropTypes from 'react-moment-proptypes'
import { connect } from 'react-redux'
import styles from './styles.scss'
import { selectDate } from '../../../../actions'

export const DateDisplay = ({ date, handleTodayClick, handleForwardClick, handleBackClick }) => {
  let today = null
  if (!date.isSame(moment(), 'day')) {
    today = (<div
      className={styles.today}
      onClick={() => handleTodayClick()}
    >
      Today
    </div>)
  }
  return (
    <div className={styles.dateDisplay}>
      {today}
      <div className={styles.past} onClick={handleBackClick(date)} />
      <div className={styles.date}>
        <div className={styles.month}>
          {date.format('MMMM')}
        </div>
        <div className={styles.day}>
          {date.format('dddd D')}
        </div>
      </div>
      <div className={styles.future} onClick={handleForwardClick(date)} />
    </div>
  )
}

DateDisplay.propTypes = {
  date: momentPropTypes.momentObj,
  handleTodayClick: PropTypes.func.isRequired,
  handleBackClick: PropTypes.func.isRequired,
  handleForwardClick: PropTypes.func.isRequired,
}

const mapDispatchToProps = dispatch => ({
  handleTodayClick: () => dispatch(selectDate(moment())),
})

const connected = connect(null, mapDispatchToProps)(DateDisplay)
export default connected
