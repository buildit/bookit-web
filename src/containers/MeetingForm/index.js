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
  isEditingMeeting,
  handleDeleteClick,
  isQuickBooking,
  errors,
  isFormTouched,
  invalid,
}) => {
  return (
    <div>
      <h2 className={styles.room}>Edit Booking</h2> {/*  Switch between 'Quick' and 'Create' and 'Edit' - No Room Name, idiots */}
      <form onSubmit={handleSubmit(submitMeeting)}>
        { isQuickBooking && <Field name="room" component={RoomPicker} /> }
        <Field
          name="title"
          component={TextField}
          floatingLabelFixed
          floatingLabelText="Event name"
        />

        <Field name="start" component={DateTimePicker} />
        <Field name="end" component={DateTimePicker} />

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
  isEditingMeeting: PropTypes.bool.isRequired,
  isQuickBooking: PropTypes.bool.isRequired,
  handleDeleteClick: PropTypes.func.isRequired,
  errors: PropTypes.shape({}),
  isFormTouched: PropTypes.bool.isRequired,
  invalid: PropTypes.bool.isRequired,
}

const mapStateToProps = state => ({
  initialValues: !state.app.isQuickCreatingMeeting ? mapInitialValues(state.app.requestedMeeting) : {},
  isFormTouched: getFormMeta('meeting-form')(state) ? true : false,
  isEditingMeeting: state.app.isEditingMeeting,
  isQuickBooking: state.app.isQuickCreatingMeeting, // Replace with real state when Quick Booking is implemented
  errors: getFormSyncErrors('meeting-form')(state),
  invalid: isInvalid('meeting-form')(state),
})

const mapDispatchToProps = dispatch => ({
  submitMeeting: meeting => dispatch(meetingUpsertStart(meeting)),
  handleDeleteClick: () => dispatch(openCancellationDialog()),
})

export default connect(mapStateToProps, mapDispatchToProps)(
  reduxForm({ form: 'meeting-form', validate })(MeetingForm))
