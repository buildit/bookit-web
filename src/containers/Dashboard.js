import React from 'react'

import MeetingsContainer from './MeetingsContainer'
import Navbar from './Navbar'

import styles from './Dashboard.scss'

import './DashboardMisc.scss'

const Dashboard = () => (
  <div className={styles.dashboard}>
    <div className={styles.dashboardMain}>

      <main>
        <MeetingsContainer />
      </main>
      <Navbar />

    </div>
    <div className={styles.dashboardSidebar}>
      <p>Sidebar</p>
    </div>
  </div>
)

export default Dashboard
