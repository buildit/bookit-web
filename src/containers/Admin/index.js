import React from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'

import Header from '../../components/02-molecules/Header'
import InfoPanel from '../InfoPanel'
import SearchableUserTable from '../../components/03-organisms/SearchableUserTable'

import { logout, openRemoveUserDialog } from '../../actions'

import styles from './styles.scss'

const Admin = ({ user, users = [], onLogoutClick, location, onRemoveClick }) => (
  <div className={styles.admin}>
    <InfoPanel pathName={location.pathname} />
    <main>
      <Header user={user} logout={onLogoutClick} />
      <SearchableUserTable users={users} onRemoveClick={onRemoveClick} />
    </main>
  </div>
)

const mapStateToProps = state => ({
  users: state.users,
  user: state.user,
})

const mapDispatchToProps = dispatch => ({
  onLogoutClick: () => {
    dispatch(logout())
  },
  onRemoveClick: (userEmail) => {
    dispatch(openRemoveUserDialog(userEmail))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(Admin)

Admin.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      location: PropTypes.string.isRequired,
      team: PropTypes.string.isRequired,
    })
  ),
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }),
  onLogoutClick: PropTypes.func.isRequired,
  onRemoveClick: PropTypes.func.isRequired,
  location: PropTypes.shape({}),
}
