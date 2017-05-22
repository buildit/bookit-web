import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import moment from 'moment';
import MeetingForm from '../../components/02-molecules/MeetingForm';
import {
  cancelMeetingRequest,
  meetingCreateStart,
  openCancellationDialog,
 } from '../../actions/index';

const validate = (values) => {
  const startMom = moment(values.start);
  const endMom = moment(values.end);

  const errors = {};

  if (startMom.isAfter(endMom)) {
    errors.end = 'The start time must be before the end time';
  }

  if (startMom.isBefore(moment())) {
    errors.noTimeTravel = 'You can\'t book in the past';
  }

  if (startMom.isAfter(moment().add(1, 'year'))) {
    errors.upperBound = 'You can only book up to one year in advance';
  }

  if (!values.title) {
    errors.title = 'Please set the title';
  }

  // TODO: Add validation here.
  return errors;
};

const MeetingFormContainer = reduxForm({
  form: 'meeting-form', // a unique name for this form
  validate,
})(MeetingForm);

const mapFormValues = values => ({
  title: values.title,
  start: values.start && moment(values.start).toDate(),
  end: values.end && moment(values.end).toDate(),
});

const getSubmittableMeeting = form => {
  // FIXME: This is crazy-sauce. What is the right way?
  if (!form) return { values: {} };
  if (!form['meeting-form']) return { values: {} };
  if (!form['meeting-form'].values) return { values: {} };
  return form['meeting-form'].values;
};

const mapStateToProps = state => ({
  token: state.user.token,
  meeting: getSubmittableMeeting(state.form, state.app.requestedMeeting.room),
  room: state.app.requestedMeeting.room,
  initialValues: mapFormValues(state.app.requestedMeeting),
  validationErrors: state.form && state.form['meeting-form'] && state.form['meeting-form'].syncErrors,
  visibleErrorMessages: ['noTimeTravel', 'end', 'upperBound'],
  isCreatingMeeting: state.app.isCreatingMeeting,
});

const mapDispatchToProps = dispatch => ({
  handleCancel: () => dispatch(cancelMeetingRequest()),
  handleSubmit: (meeting, room, token) => dispatch(meetingCreateStart(meeting, room, token)),
  handleDeleteClick: () => dispatch(openCancellationDialog()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MeetingFormContainer);
