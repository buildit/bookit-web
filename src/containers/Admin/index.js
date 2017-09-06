import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'

import Header from '../../components/02-molecules/Header'
import InfoPanel from '../InfoPanel'
import SearchableUserTable from '../../components/03-organisms/SearchableUserTable'

import { logout, openRemoveUserDialog, usersFetchStart } from '../../actions'
import { getUser, getUsers } from '../../selectors'

import styles from './styles.scss'

export class Admin extends Component {
  componentDidMount() {
    this.props.fetchUsersList()
  }

  render() {
    const { user, users = [], onLogoutClick, location, onRemoveClick } = this.props

    return (
      <div className={styles.admin}>
        <InfoPanel pathName={location.pathname} />
        <main>
          <Header user={user} logout={onLogoutClick} />
          <SearchableUserTable users={users} onRemoveClick={onRemoveClick} />
        </main>
      </div>
    )
  }

}


const mapStateToProps = state => ({
  users: getUsers(state),
  user: getUser(state),
})

const mapDispatchToProps = dispatch => ({
  onLogoutClick: () => {
    dispatch(logout())
  },
  onRemoveClick: (userEmail) => {
    dispatch(openRemoveUserDialog(userEmail))
  },
  fetchUsersList: () => {
    dispatch(usersFetchStart())
  },
})

Admin.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      email: PropTypes.string.isRequired,
      team: PropTypes.string.isRequired,
      roles: PropTypes.arrayOf(PropTypes.string).isRequired,
    })
  ),
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }),
  onLogoutClick: PropTypes.func.isRequired,
  onRemoveClick: PropTypes.func.isRequired,
  fetchUsersList: PropTypes.func.isRequired,
  location: PropTypes.shape({}),
}

const connected = connect(mapStateToProps, mapDispatchToProps)(Admin)

export default connected
