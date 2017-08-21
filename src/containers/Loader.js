import React from 'react'

import Link from '../components/01-atoms/Link'

import styles from './Loader.scss'

const Loader = () => (
  <div className={styles.loader}>
    <div className={styles.loaderItem}>
      <h1>BookIt</h1>
      <Link to="/dashboard">Dashboard</Link>
      {/*<div className={styles.loaderProgress}></div>*/}
    </div>
  </div>
)

export default Loader
