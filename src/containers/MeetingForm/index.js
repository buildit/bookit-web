import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import { TextField } from 'redux-form-material-ui'
import Button from '../../components/01-atoms/Button'
import DateTimePicker from '../../components/02-molecules/DateTimePicker'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { mapInitialValues, getSubmittableMeeting } from './utils'
import validate from './validate'

import {
  meetingCreateStart,
  meetingEditStart,
  openCancellationDialog,
 } from '../../actions/index'

injectTapEventPlugin() // Required by Material UI components

const RoomPicker = (field) => {
  console.log(field.options)
  return (
    <select
      onChange={value => field.input.onChange(value)}
      value={field.input.value}
    >
      {field.options.map(
        option => (
          <option
            key={option.id}
            value={option.id}
            >{option.name}</option>
        )
      )}
    </select>
  )
}

const MeetingForm = ({ handleSubmit, submitMeeting, rooms }) => {
  return (
    <div>
      <form onSubmit={handleSubmit(submitMeeting)}>
        <Field
          name="title"
          component={TextField}
          floatingLabelFixed
          floatingLabelText="Event name"
        />
        <Field
          name="start"
          label="Start"
          component={DateTimePicker}
        />
        <Field
          name="end"
          label="End"
          component={DateTimePicker}
        />
        <Field
          name="room"
          component={RoomPicker}
          options={rooms}
        />
        <Button type="submit" content="Bookit" />
      </form>
    </div>
  )
}

MeetingForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitMeeting: PropTypes.func.isRequired,
  rooms: PropTypes.arrayOf(PropTypes.shape({})),
}

const mapStateToProps = state => ({
  meeting: getSubmittableMeeting(state.form, state.app.requestedMeeting),
  room: state.app.requestedMeeting.room,
  roomId: state.app.requestedMeeting.roomId,
  initialValues: mapInitialValues(state.app.requestedMeeting),
  validationErrors: state.form && state.form['meeting-form'] && state.form['meeting-form'].syncErrors,
  visibleErrorMessages: ['noTimeTravel', 'end', 'upperBound', 'title'],
  isCreatingMeeting: state.app.isCreatingMeeting,
  isEditingMeeting: state.app.isEditingMeeting,
  rooms: Object.values(state.app.roomsById),
})

const mapDispatchToProps = dispatch => ({
  submitMeeting: meeting => dispatch(meetingCreateStart(meeting)),
  handleDeleteClick: () => dispatch(openCancellationDialog()),
  handleSaveClick: (meeting, roomId, token) => dispatch(meetingEditStart(meeting, roomId, token)),
})

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'meeting-form',
  validate,
})(MeetingForm))
