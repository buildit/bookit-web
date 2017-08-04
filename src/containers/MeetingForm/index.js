import { connect } from 'react-redux'

import { reduxForm } from 'redux-form'

import moment from 'moment'

import MeetingForm from '../../components/02-molecules/MeetingForm'

import {
  meetingCreateStart,
  meetingEditStart,
  openCancellationDialog,
 } from '../../actions/index'

const validate = (values) => {
  console.log(values)
  const startMom = moment(values.start)
  const endMom = moment(values.end)
  const now = moment()

  const errors = {}

  if (startMom.isAfter(endMom)) {
    errors.end = 'The start time must be before the end time'
  }

  if (startMom.isBefore(now)) {
    errors.noTimeTravel = 'You can\'t book in the past'
  }

  if (startMom.isAfter(moment().add(1, 'year'))) {
    errors.upperBound = 'You can only book up to one year in advance'
  }

  if (!values.title) {
    errors.title = 'Please set the title'
  }

  return errors
}

const MeetingFormContainer = reduxForm({
  form: 'meeting-form', // a unique name for this form
  validate,
})(MeetingForm)

const mapFormValues = values => ({
  id: values.id,
  title: values.title,
  start: values.start && moment(values.start).toDate(),
  end: values.end && moment(values.end).toDate(),
})

const getSubmittableMeeting = (form, meeting) => {
  // FIXME: This is crazy-sauce. What is the right way?
  // console.log('submittable', meeting)
  if (!form) return { values: {} }
  if (!form['meeting-form']) return { values: {} }
  if (!form['meeting-form'].values) return { values: {} }
  let submittableValues = form['meeting-form'].values
  submittableValues.id = meeting.id
  // console.log('submittable', submittableValues)

  return submittableValues
}

const mapStateToProps = state => ({
  token: state.user.token,
  meeting: getSubmittableMeeting(state.form, state.app.requestedMeeting),
  room: state.app.requestedMeeting.room,
  roomId: state.app.requestedMeeting.roomId,
  initialValues: mapFormValues(state.app.requestedMeeting),
  validationErrors: state.form && state.form['meeting-form'] && state.form['meeting-form'].syncErrors,
  visibleErrorMessages: ['noTimeTravel', 'end', 'upperBound'],
  isCreatingMeeting: state.app.isCreatingMeeting,
})

const mapDispatchToProps = dispatch => ({
  handleSubmit: (meeting, room, token) => dispatch(meetingCreateStart(meeting, room, token)),
  handleDeleteClick: () => dispatch(openCancellationDialog()),
  handleSaveClick: (meeting, roomId, token) => dispatch(meetingEditStart(meeting, roomId, token)),
})

export default connect(mapStateToProps, mapDispatchToProps)(MeetingFormContainer)
