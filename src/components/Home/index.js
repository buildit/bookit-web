
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import styles from './styles.scss';
import { updateMessage, userFetchRequested } from '../../actions';

export const Home = ({ onMessageClick, onUserFetchRequest, message }) => (
  <section>
    <p className={styles.paragraph}>
      Welcome to the <strong>Static React Starter-kyt</strong>.
      This starter kyt should serve as the base for a client rendered React app.
    </p>
    <p className={styles.paragraph}>
      Check out the Tools section for an outline of the libraries that
      are used in this Starter-kyt.
    </p>
    <button
      onClick={() => {
        onMessageClick();
      }}
    >
      Click me!
    </button>
    <button
      onClick={() => {
        onUserFetchRequest('aww');
      }}
    >
      Fetch pandas
    </button>
    <div> {message} </div>
  </section>
);

Home.propTypes = {
  message: PropTypes.string,
  onMessageClick: PropTypes.func,
  onUserFetchRequest: PropTypes.func,
};

const mapStateToProps = state => ({
  message: state.message,
});


const mapDispatchToProps = dispatch => ({
  onMessageClick: () => {
    dispatch(updateMessage());
  },
  onUserFetchRequest: (userId) => {
    dispatch(userFetchRequested(userId));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
