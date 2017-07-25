import React from 'react'
import PropTypes from 'prop-types'

import { Field } from 'redux-form'
import { TextField } from 'redux-form-material-ui'
import DateTimePicker from '../DateTimePicker/index'
import Button from '../../01-atoms/Button/index'
import ErrorMessages from '../ErrorMessages'
import styles from './styles.scss'


const meetingTitleStyle = { fontSize: '18px', fontWeight: '100' }
const isNotEmpty = obj => Object.keys(obj).length > 0

const MeetingForm = ({
  handleSubmit,
  invalid,
  errors = {},
  token,
  meeting,
  room,
  roomId,
  validationErrors = {},
  visibleErrorMessages,
  isCreatingMeeting,
  handleDeleteClick,
  handleSaveClick,
 }) => {
  const isSubmitDisabled = invalid && isNotEmpty(validationErrors)

  const buttons = isCreatingMeeting
    ? <Button disabled={isSubmitDisabled} type="submit" content="Bookit" />
    : (<div className={styles.buttons}>
      <Button disabled={invalid} onClick={() => handleDeleteClick()} content="Delete" />
      <Button disabled={invalid} onClick={() => handleSaveClick(meeting, roomId, token)} content="Save" />
    </div>)

  const header = isCreatingMeeting
    ? <div className={styles.room}>Book {room.name} Room</div>
    : <div className={styles.room}>Edit Event Info</div>

  return (
    <div className={styles.editor}>
      { header }
      <form
        onSubmit={(event) => {
          event.preventDefault()
          handleSubmit(meeting, room, token)
        }}
      >
        <Field floatingLabelFixed floatingLabelText="Event name" name="title" component={TextField} errorText={errors.title} style={meetingTitleStyle} />
        <DateTimePicker locale="en-US" name="start" label="Start" />
        <DateTimePicker name="end" label="End" />
        { buttons }
        <ErrorMessages messages={validationErrors} allowableMessages={visibleErrorMessages} />
      </form>
    </div>
  )
}

MeetingForm.propTypes = {
  invalid: PropTypes.bool,
  errors: PropTypes.shape({}),
  validationErrors: PropTypes.shape({}),
  visibleErrorMessages: PropTypes.arrayOf(PropTypes.string),
  handleSubmit: PropTypes.func,
  token: PropTypes.string,
  meeting: PropTypes.shape({
    title: PropTypes.string,
    start: PropTypes.date,
    end: PropTypes.date,
  }),
  room: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
  }),
  roomId: PropTypes.string,
  handleDeleteClick: PropTypes.func.isRequired,
  handleSaveClick: PropTypes.func.isRequired,
  isCreatingMeeting: PropTypes.bool.isRequired,
}

export default MeetingForm
