import React from 'react'
import PropTypes from 'prop-types'

import { reduxForm, Field, getFormMeta, getFormSyncErrors, isInvalid } from 'redux-form'
import { connect } from 'react-redux'

import injectTapEventPlugin from 'react-tap-event-plugin'

import { TextField } from 'redux-form-material-ui'

import Button from '../../components/01-atoms/Button'
import RoomPicker from '../../components/01-atoms/RoomPicker'
import DateTimePicker from '../../components/02-molecules/DateTimePicker'
import ErrorMessages from '../../components/02-molecules/ErrorMessages'

import { mapInitialValues } from './utils'
import { validate } from './validate'

import styles from './styles.scss'

import {
  meetingUpsertStart,
  openCancellationDialog,
 } from '../../actions/index'

injectTapEventPlugin() // Required by Material UI components

export const MeetingForm = ({
  handleSubmit,
  submitMeeting,
  rooms,
  isEditingMeeting,
  handleDeleteClick,
  isQuickBooking,
  roomName,
  errors,
  isFormTouched,
  invalid,
}) => {
  return (
    <div>
      { isEditingMeeting
        ? <h2 className={styles.room}>Edit Booking</h2>
        : <h2 className={styles.room}>Book { roomName } Room</h2> }
      <form onSubmit={handleSubmit(submitMeeting)}>
        <Field
          name="title"
          component={TextField}
          floatingLabelFixed
          floatingLabelText="Event name"
        />
        <Field name="start" component={DateTimePicker} />
        <Field name="end" component={DateTimePicker} />

        { isQuickBooking
          ? <Field name="room" component={RoomPicker} options={rooms} />
          : null }
        <div className={styles.buttons}>
          <Button
            disabled={!isFormTouched || invalid}
            type="submit" content={isEditingMeeting ? "Save" : "Bookit" } />

          { isEditingMeeting
            ? <Button onClick={handleDeleteClick} content="Delete" />
            : null }
        </div>
      </form>

      { isFormTouched
        ? <ErrorMessages errors={errors} />
        : null }
    </div>
  )
}

MeetingForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitMeeting: PropTypes.func.isRequired,
  rooms: PropTypes.arrayOf(PropTypes.shape({})),
  isEditingMeeting: PropTypes.bool.isRequired,
  isQuickBooking: PropTypes.bool.isRequired,
  handleDeleteClick: PropTypes.func.isRequired,
  roomName: PropTypes.string.isRequired,
  errors: PropTypes.shape({}),
  isFormTouched: PropTypes.bool.isRequired,
  invalid: PropTypes.bool.isRequired,
}

const mapStateToProps = state => ({
  roomName: state.app.requestedMeeting.room.name,
  initialValues: mapInitialValues(state.app.requestedMeeting),
  isFormTouched: getFormMeta('meeting-form')(state) ? true : false,
  isEditingMeeting: state.app.isEditingMeeting,
  isQuickBooking: false, // Replace with real state when Quick Booking is implemented
  rooms: Object.values(state.app.roomsById), // Should be filtered by what's available
  errors: getFormSyncErrors('meeting-form')(state),
  invalid: isInvalid('meeting-form')(state),
})

const mapDispatchToProps = dispatch => ({
  submitMeeting: meeting => dispatch(meetingUpsertStart(meeting)),
  handleDeleteClick: () => dispatch(openCancellationDialog()),
})

export default connect(mapStateToProps, mapDispatchToProps)(
  reduxForm({ form: 'meeting-form', validate })(MeetingForm))
