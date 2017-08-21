import React from 'react'

import MeetingsContainer from './MeetingsContainer'

import styles from './Dashboard.scss'

import './DashboardMisc.scss'

const Dashboard = () => (
  <div className={styles.dashboard}>
    <div className={styles.dashboardMain}>
      <main>
        <MeetingsContainer />
      </main>
      <nav><div>Hello <span>Bruce Springsteen!</span></div><div><a href="#">Log out</a></div></nav>
    </div>
    <div className={styles.dashboardSidebar}>
      <p>Sidebar</p>
    </div>
  </div>
)

export default Dashboard
