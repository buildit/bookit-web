import React from 'react'

import moment from 'moment'

import styles from './styles.scss'

const WIDTH = 82

const calculateOffset = () => {
  const now = moment()
  const hour = now.hour()
  const minutes = now.minutes()
  return (WIDTH * (hour + (minutes / 60)))
}

const calculatedStyle = {
  left: calculateOffset(),
}

const CurrentTimeIndicator = () => (
  (<div
    className={styles.currentTimeIndicator}
    style={calculatedStyle}
  />)
)

export default CurrentTimeIndicator
