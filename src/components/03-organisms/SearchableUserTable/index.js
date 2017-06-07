import React, { PropTypes } from 'react';
import TeamSelector from './TeamSelector';
import UserTableRow from './UserTableRow';
import UserTableHeader from './UserTableHeader';
import SearchBar from './SearchBar';
import styles from './styles.scss';


class SearchableUserTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: '',
      filterTeam: 'DESIGNIT',
    };
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    this.handleSelectTeamChange = this.handleSelectTeamChange.bind(this);
  }

  handleFilterTextChange(filterText) {
    this.setState({ filterText });
  }

  handleSelectTeamChange(filterTeam) {
    this.setState({ filterTeam });
  }

  render() {
    const { users } = this.props;
    const filteredUsers = users
      .filter(user => (
        this.state.filterTeam === 'ALL' ||
        user.team === this.state.filterTeam
      ))
      .filter(user => {
        if (this.state.filterText.length > 0) {
          return user.name === this.state.filterText;
        }
        return true;
      });

    return (
      <div className={styles.userTable}>
        <SearchBar
          filterText={this.state.filterText}
          handleFilterTextChange={this.handleFilterTextChange}
        />
        <TeamSelector
          teams={[
            { name: 'Designit', id: 'DESIGNIT' },
            { name: 'Buildit', id: 'BUILDIT' },
            { name: 'Others', id: 'OTHERS' },
          ]}
          selectedTeam={this.state.filterTeam}
          handleSelectTeamChange={this.handleSelectTeamChange}
        />
        <table>
          <UserTableHeader />
          <tbody>
            {filteredUsers.map(user => <UserTableRow key={user.email} user={user} />)}
          </tbody>
        </table>
      </div>
    );
  }
}

export default SearchableUserTable;

SearchableUserTable.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    team: PropTypes.string.isRequired,
  }),
),
};
