import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import SearchableUserTable from '../../components/03-organisms/SearchableUserTable';

const Admin = ({ users = [] }) => <SearchableUserTable users={users} />;

const mapStateToProps = state => ({
  users: state.users,
});

export default connect(mapStateToProps, null)(Admin);

Admin.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    team: PropTypes.string.isRequired,
  }),
),
};
