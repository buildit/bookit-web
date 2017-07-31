import React from 'react'
import PropTypes from 'prop-types'

import styles from './styles.scss'

const formatName = user => (
  (`${user.firstName || ''} ${user.lastName || ''}`).trim()
)

const UserTableRow = ({ user, onRemoveClick }) => (
  <tr className={styles.userTableRow}>
    <td>{formatName(user)}</td>
    <td>{user.location}</td>
    <td>{user.email}</td>
    <td className={styles.remove} onClick={() => onRemoveClick(user.email)}>Remove</td>
  </tr>
)

export default UserTableRow

UserTableRow.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string.isRequired,
    team: PropTypes.string.isRequired,
  }),
  onRemoveClick: PropTypes.func.isRequired,
}
