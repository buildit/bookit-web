import React from 'react'
import PropTypes from 'prop-types'
import momentPropTypes from 'react-moment-proptypes'

import { connect } from 'react-redux'
import { selectDate } from '../../../../actions'
import styles from './styles.scss'
import { day as dayConfig, dot as dotConfig } from '../config'

export const Day = ({ day, handleClick }) => {
  const dayStyle = {
    width: `${dayConfig.size}rem`,
    height: `${dayConfig.size}rem`,
    padding: `${dayConfig.padding}rem`,
    fontSize: `${dayConfig.fontSize}rem`,
  }
  const numberStyle = {}
  const dotStyle = {
    width: `${dotConfig.size}px`,
    height: `${dotConfig.size}px`,
  }
  if (day.isSelectedDate) {
    dayStyle.background = '#2b3947' // grey-blue
  }
  if (!day.isInCurrentMonth) {
    dayStyle.opacity = '0'
  }
  if (day.isToday) {
    numberStyle.borderBottom = '2px solid white'
  }
  if (day.hasUserOwnedMeeting) {
    dotStyle.background = '#fbfe34' // brand yellow
  }
  return (
    <span
      className={styles.day}
      style={dayStyle}
      onClick={() => handleClick(day.date)}
    >
      <span
        className={styles.number}
        style={numberStyle}
      >
        { day.date.format('D') }
        <span
          className={styles.dot}
          style={dotStyle}
        />
      </span>
    </span>
  )
}

Day.propTypes = {
  day: PropTypes.shape({
    date: momentPropTypes.momentObj,
  }),
  handleClick: PropTypes.func.isRequired,
}

const mapDispatchToProps = dispatch => ({
  handleClick: date => dispatch(selectDate(date)),
})

const connected = connect(null, mapDispatchToProps)(Day)

export default connected
