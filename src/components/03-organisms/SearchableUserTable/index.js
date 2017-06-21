import React from 'react'
import PropTypes from 'prop-types'

import TeamSelector from './TeamSelector'
import UserTableRow from './UserTableRow'
import UserTableHeader from './UserTableHeader'
import SearchBar from './SearchBar'
import styles from './styles.scss'


class SearchableUserTable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      filterText: '',
      filterTeam: 'DESIGNIT',
    }
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this)
    this.handleSelectTeamChange = this.handleSelectTeamChange.bind(this)
    this.checkFirstLastName = this.checkFirstLastName.bind(this)
  }

  handleFilterTextChange(filterText) {
    this.setState({ filterText })
  }

  handleSelectTeamChange(filterTeam) {
    this.setState({ filterTeam })
  }

  checkFirstLastName(filterTextMatcher, name) {
    let names = name.split(" ")
    return names.some((x) => {
      return filterTextMatcher.test(x)
    })
  }

  render() {
    const { users, onRemoveClick } = this.props
    let filterTextMatcher

    if (this.state.filterText.length > 0) {
      filterTextMatcher = new RegExp(`^${this.state.filterText}`, 'i')
    }
    const filteredUsers = users
      .filter(user => (
        this.state.filterTeam === 'ALL' ||
        user.team === this.state.filterTeam
      ))
      .filter(user => (filterTextMatcher ? this.checkFirstLastName(filterTextMatcher, user.name) : true))

    return (
      <div className={styles.userTable}>
        <SearchBar
          filterText={this.state.filterText}
          handleFilterTextChange={this.handleFilterTextChange}
        />
        <TeamSelector
          teams={[
            { name: 'Designit', id: 'DESIGNIT' },
            { name: 'Wipro', id: 'WIPRO' },
          ]}
          selectedTeam={this.state.filterTeam}
          handleSelectTeamChange={this.handleSelectTeamChange}
        />
        <table>
          <UserTableHeader />
          <tbody>
            {filteredUsers.map(user => (
              <UserTableRow
                key={user.email}
                user={user}
                onRemoveClick={onRemoveClick}
              />
            ))}
          </tbody>
        </table>
      </div>
    )
  }
}

export default SearchableUserTable

SearchableUserTable.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      location: PropTypes.string.isRequired,
      team: PropTypes.string.isRequired,
    })
  ),
  onRemoveClick: PropTypes.func.isRequired,
}
