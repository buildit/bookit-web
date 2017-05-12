import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import moment from 'moment';
import MeetingEditor from '../../components/02-molecules/MeetingEditor';
import { cancelMeetingRequest, meetingCreateStart } from '../../actions/index';

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

const MeetingForm = reduxForm({
  form: 'meeting-editor', // a unique name for this form
  validate,
})(MeetingEditor);

const mapFormValues = (values) => ({
  title: values.title,
  start: values.start && values.start.toDate(),
  end: values.end && values.end.toDate(),
});

const mapDispatchToProps = (dispatch) => ({
  handleCancel: () => dispatch(cancelMeetingRequest()),
  handleSubmit: (meeting, room) => dispatch(meetingCreateStart(meeting, room)),
});

const getSubmittableMeeting = form => {
  // FIXME: This is crazy-sauce. What is the right way?
  if (!form) return { values: {} };
  if (!form['meeting-editor']) return { values: {} };
  if (!form['meeting-editor'].values) return { values: {} };
  return form['meeting-editor'].values;
};

export default connect((state) => ({
  meeting: getSubmittableMeeting(state.form, state.app.requestedMeeting.room),
  room: state.app.requestedMeeting.room,
  initialValues: mapFormValues(state.app.requestedMeeting),
  validationErrors: state.form && state.form['meeting-editor'] && state.form['meeting-editor'].syncErrors,
  visibleErrorMessages: ['noTimeTravel', 'end', 'upperBound'],
}), mapDispatchToProps)(MeetingForm);
