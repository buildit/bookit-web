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

import { getRoomName, isQuickBooking, isEditingBooking } from '../../selectors'

import styles from './styles.scss'

import {
  meetingUpsertStart,
  openCancellationDialog,
 } from '../../actions/index'

injectTapEventPlugin() // Required by Material UI components

export const MeetingForm = ({
  handleSubmit,
  submitMeeting,
  isQuickBooking,
  isEditingBooking,
  handleDeleteClick,
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
            type="submit"
            disabled={ !isFormTouched || invalid }
            content={isEditingBooking ? "Save" : "Bookit" }
          />

          { isEditingBooking && <Button onClick={handleDeleteClick} content="Delete" /> }
        </div>
      </form>

      { isFormTouched && <ErrorMessages errors={errors} /> }
    </div>
  )
}

MeetingForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitMeeting: PropTypes.func.isRequired,
  isEditingBooking: PropTypes.bool,
  isQuickBooking: PropTypes.bool,
  handleDeleteClick: PropTypes.func.isRequired,
  errors: PropTypes.shape({}),
  isFormTouched: PropTypes.bool.isRequired,
  invalid: PropTypes.bool.isRequired,
  roomName: PropTypes.string,
}

const valueSelector = formValueSelector('meeting-form')

const mapStateToProps = state => ({
  initialValues: mapInitialValues(state),
  isFormTouched: getFormMeta('meeting-form')(state) ? true : false,
  isQuickBooking: isQuickBooking(state),
  isEditingBooking: isEditingBooking(state),
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
