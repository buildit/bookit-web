import React from 'react'

import Link from '../components/01-atoms/Link'

import styles from './Loader.scss'
import loaderStyles from './LoaderCircles.scss'

// loading-circles
// circle hold

const LoaderCircles = () => (
  <div className={loaderStyles.loadingOverlay}>
    <div className={loaderStyles.loadingCircles}>
      <div className={[ loaderStyles.circle, loaderStyles.hold ].join(' ')}></div>
      <div className={[ loaderStyles.circle, loaderStyles.first ].join(' ')}></div>
      <div className={loaderStyles.circle}></div>
      <div className={loaderStyles.circle}></div>
    </div>
  </div>
)

const Loader = () => (
  <div className={styles.loader}>
    <LoaderCircles />
    <div className={styles.loaderItem}>
      <h1>BookIt</h1>
      <Link to="/dashboard">Dashboard</Link>
      {/*<div className={styles.loaderProgress}></div>*/}
    </div>
  </div>
)

export default Loader
