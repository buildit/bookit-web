import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Header from '../../components/02-molecules/Header';
import InfoPanel from '../InfoPanel';
import SearchableUserTable from '../../components/03-organisms/SearchableUserTable';
import { logout } from '../../actions';
import styles from './styles.scss';

const Admin = ({ user, users = [], onLogoutClick }) => (
  <div className={styles.admin}>
    <InfoPanel />
    <main>
      <Header user={user} logout={onLogoutClick} />
      <SearchableUserTable users={users} />
    </main>
  </div>
);

const mapStateToProps = state => ({
  users: state.users,
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  onLogoutClick: () => {
    dispatch(logout());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Admin);

Admin.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      location: PropTypes.string.isRequired,
      team: PropTypes.string.isRequired,
    }),
  ),
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }),
  onLogoutClick: PropTypes.func.isRequired,
};
