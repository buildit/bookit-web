import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import Button from '../../01-atoms/Button/index';

import { cancelMeetingCancel } from '../../../actions';

import styles from './styles.scss';

export class MeetingCancelContainer extends React.Component {
  static propTypes = {
    meeting: PropTypes.shape({
      owner: PropTypes.shape({
        name: PropTypes.string,
        email: PropTypes.string,
      }),
      isOwnedByUser: PropTypes.bool,
      duration: PropTypes.number.isRequired,
      startTime: PropTypes.shape({}),
      title: PropTypes.string,
    }).isRequired,
    cancelMeetingCancel: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    this.onConfirmCancel = this.onConfirmCancel.bind(this);
    this.onCancelCancel = this.onCancelCancel.bind(this);
  }

  onConfirmCancel() {
    console.log('CANCELLING!', this.props.meeting);
    this.props.cancelMeetingCancel();
  }

  onCancelCancel() {
    this.props.cancelMeetingCancel();
  }

  render() {
    return (
      <div className={styles.cancelMeeting}>
        <p>Are you sure you want to cancel this meeting?</p>

        <div>
          <Button onClick={this.onConfirmCancel} content="Yes" />
          <Button onClick={this.onCancelCancel} content="No" />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  meeting: state.requestedMeeting,
});

const mapDispatchToProps = dispatch => ({
  cancelMeetingCancel: () => {
    dispatch(cancelMeetingCancel());
  },
});

const connected = connect(
  mapStateToProps,
  mapDispatchToProps
)(MeetingCancelContainer);

export default connected;
