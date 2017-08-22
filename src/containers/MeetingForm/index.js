import React from 'react'
import PropTypes from 'prop-types'

import { reduxForm, Field, formValueSelector, getFormMeta, getFormSyncErrors, isInvalid } from 'redux-form'
import { connect } from 'react-redux'

import injectTapEventPlugin from 'react-tap-event-plugin'

import { TextField } from 'redux-form-material-ui'

import Button from '../../components/01-atoms/Button'
import RoomPicker from '../../components/01-atoms/RoomPicker'
import DateTimePicker from '../../components/02-molecules/DateTimePicker'
import ErrorMessages from '../../components/02-molecules/ErrorMessages'

import { mapInitialValues } from './utils'
import { validate } from './validate'

import { getRoomName } from '../../selectors'

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
  roomName,
}) => {
  return (
    <div>
      <h2 className={styles.room}>Book { roomName || 'a' } Room</h2> {/*  Switch between 'Quick' and 'Create' and 'Edit' - No Room Name, idiots */}
      <form onSubmit={handleSubmit(submitMeeting)}>
        <Field
          name="title"
          component={TextField}
          floatingLabelFixed
          floatingLabelText="Event name"
          style={{width: '324px', fontWeight: '100'}}
        />

        <Field name="start" component={DateTimePicker} />
        <Field name="end" component={DateTimePicker} />

        { isQuickBooking && <Field name="room" component={RoomPicker} /> }
        { !isQuickBooking && <Field name="room" component="input" type="hidden" /> }

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
  roomName: PropTypes.string,
}

const valueSelector = formValueSelector('meeting-form')

const mapStateToProps = state => ({
  initialValues: mapInitialValues(state.app.requestedMeeting, state.app.isQuickCreatingMeeting),
  isFormTouched: getFormMeta('meeting-form')(state) ? true : false,
  isEditingMeeting: state.app.isEditingMeeting,
  isQuickBooking: state.app.isQuickCreatingMeeting, // Replace with real state when Quick Booking is implemented
  errors: getFormSyncErrors('meeting-form')(state),
  invalid: isInvalid('meeting-form')(state),
  roomName: getRoomName(state, valueSelector(state, 'room')),
})

const mapDispatchToProps = dispatch => ({
  submitMeeting: meeting => dispatch(meetingUpsertStart(meeting)),
  handleDeleteClick: () => dispatch(openCancellationDialog()),
})

export default connect(mapStateToProps, mapDispatchToProps)(
  reduxForm({ form: 'meeting-form', validate })(MeetingForm))
