import React from 'react'

import cn from '../utils/class-names'

import styles from './CirclesSpinner.scss'

const CirclesSpinner = () => (
  <div className={styles.loadingCircles}>
    <div className={cn(styles.circle, styles.hold)}></div>
    <div className={cn(styles.circle, styles.first)}></div>
    <div className={styles.circle}></div>
    <div className={styles.circle}></div>
  </div>
)

export default CirclesSpinner
