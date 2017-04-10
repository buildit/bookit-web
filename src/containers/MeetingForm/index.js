import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import moment from 'moment';
import MeetingEditor from '../../components/02-molecules/MeetingEditor';
import { cancelMeetingRequest, createMeetingStart } from '../../actions/index';

const validate = (values) => {
  const startMom = moment(values.start);
  const endMom = moment(values.end);

  const errors = {};

  if (startMom.isAfter(endMom)) {
    errors.start = 'Must be before end';
  }

  if (!values.title) {
    errors.title = 'Please set the title';
  }
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
  handleSubmit: (meeting) => dispatch(createMeetingStart(meeting)),
});

const getSubmittableMeeting = (form, room) => {
  // FIXME: This is crazy-sauce. What is the right way?
  if (!form) return { values: {} };
  if (!form['meeting-editor']) return { values: {} };
  if (!form['meeting-editor'].values) return { values: {} };
  return { ...form['meeting-editor'].values, room };
};

export default connect((state) => ({
  meeting: getSubmittableMeeting(state.form, state.app.requestedMeeting.room),
  initialValues: mapFormValues(state.app.requestedMeeting),
  validationErrors: state.form && state.form['meeting-editor'] && state.form['meeting-editor'].syncErrors,
}), mapDispatchToProps)(MeetingForm);
