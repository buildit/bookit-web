import React, { PropTypes } from 'react';
import { Field } from 'redux-form';
import { TextField } from 'redux-form-material-ui';
import DateTimePicker from '../DateTimePicker/index';
import Button from '../../01-atoms/Button/index';
import ErrorMessages from '../ErrorMessages';
import styles from './styles.scss';
// TODO: replace Cancel button with svg asset.
const images = require.context('../../../assets/images', true);

const meetingTitleStyle = { fontSize: '18px', fontWeight: '100' };

const MeetingForm = ({
  handleSubmit,
  handleCancel,
  invalid,
  errors = {},
  meeting,
  room,
  validationErrors = {},
  visibleErrorMessages,
  isCreatingMeeting,
  handleDeleteClick,
 }) => {
  const buttons = isCreatingMeeting
    ? <Button disabled={invalid} type="submit" content="Bookit" />
    : (<div className={styles.buttons}>
      <Button name={'delete'} disabled={invalid} onClick={() => handleDeleteClick()} content="Delete" />
      <Button disabled content="Save" />
    </div>);

  const header = isCreatingMeeting
    ? <div id={'editor-header'} className={`${styles.header} header`}>Book {room.name} Room</div>
    : <div id={'editor-header'} className={`${styles.header} header`}>Edit Event Info</div>;

  return (
    <div className={`${styles.editor} editor`}>
      <img src={images('./close-desktop.png')} className={styles.cancel} onClick={handleCancel} alt="X" />
      { header }
      <form
        onSubmit={(event) => {
          event.preventDefault();
          handleSubmit(meeting, room);
        }}
      >
        <Field floatingLabelFixed floatingLabelText="Event name" name="title" component={TextField} errorText={errors.title} style={meetingTitleStyle} />
        <DateTimePicker locale="en-US" name="start" label="Start" />
        <DateTimePicker name="end" label="End" />
        { buttons }
        <ErrorMessages messages={validationErrors} allowableMessages={visibleErrorMessages} />
      </form>
    </div>
   );
};

MeetingForm.propTypes = {
  invalid: PropTypes.bool,
  errors: PropTypes.shape({}),
  validationErrors: PropTypes.shape({}),
  visibleErrorMessages: PropTypes.arrayOf(PropTypes.string),
  handleSubmit: PropTypes.func,
  handleCancel: PropTypes.func,
  meeting: PropTypes.shape({
    title: PropTypes.string,
    start: PropTypes.date,
    end: PropTypes.date,
  }),
  room: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
  }),
  handleDeleteClick: PropTypes.func.isRequired,
  isCreatingMeeting: PropTypes.bool.isRequired,
};

export default MeetingForm;
