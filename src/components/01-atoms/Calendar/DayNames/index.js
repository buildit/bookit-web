import React from 'react'

import { day as config } from '../config'

import styles from './styles.scss'

const style = {
  width: `${config.size}rem`,
  height: `${config.size}rem`,
  padding: `${config.padding}rem`,
  fontSize: `${config.fontSize}rem`,
}

const DayNames = () => (
  <div className={styles.dayNames}>
    {['s', 'm', 't', 'w', 't', 'f', 's'].map((day, index) => (
      <span
        key={index}
        className={styles.dayName}
        style={style}
      >{day}</span>
    ))}
  </div>
)

export default DayNames
