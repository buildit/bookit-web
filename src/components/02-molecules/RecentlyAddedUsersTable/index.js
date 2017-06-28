import React from 'react'
import PropTypes from 'prop-types'

import moment from 'moment'
import styles from './styles.scss'

const isUserRecent = user => (
  user.dateAdded
  ? user.dateAdded.isAfter(moment().subtract(1, 'week'))
  : false
)

const RecentlyAddedUsersTable = ({ users = [] }) => (
  <div key="9" className={styles.recentlyAddedUsersTable}>
    <h2>Recently Added Users</h2>
    <table>
      <tbody>
      {users
        .filter(isUserRecent)
        .map(user => (
          <tr key={user.email}>
            <td>{user.name}</td>
            <td className={styles.team}>{user.team.toLowerCase()}</td>
          </tr>
        ))
      }
      </tbody>
    </table>
  </div>
)

export default RecentlyAddedUsersTable

RecentlyAddedUsersTable.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    team: PropTypes.string.isRequired,
  })
),
}
