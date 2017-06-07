import React from 'react'

import moment from 'moment'

import styles from './styles.scss'


const timeLabels = () => {
  const today = moment().startOf('day')
  const nextDay = moment().startOf('day').add(1, 'day').dayOfYear()
  const labels = []

  while (today.dayOfYear() < nextDay) {
    labels.push(today.format('h:00a'))
    today.add(1, 'hour')
  }
  return labels
}

const TimelineLabelList = () => (
  <div className={styles.timelabels}>
    { timeLabels().map((timeLabel, index) =>
      <div key={index} className={styles.timelabel}>{timeLabel}</div>
    )}
  </div>
)

export default TimelineLabelList
