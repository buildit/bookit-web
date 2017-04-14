import React, { PropTypes } from 'react';
import { Field } from 'redux-form';
import { TextField } from 'redux-form-material-ui';
import DateTimePicker from '../DateTimePicker/index';
import Button from '../../01-atoms/Button/index';
import ErrorMessages from '../ErrorMessages';
// TODO: replace Cancel button with svg asset.

const MeetingEditor = ({
  handleSubmit,
  handleCancel,
  invalid,
  errors = {},
  meeting,
  room,
  validationErrors = {},
  visibleErrorMessages,
 }) =>
 (<form
   onSubmit={(event) => {
     event.preventDefault();
     handleSubmit(meeting, room);
   }}
 >
   <Field floatingLabelText="Title" name="title" component={TextField} errorText={errors.title} />
   <DateTimePicker name="start" label="Start" />
   <DateTimePicker name="end" label="End" />
   <Button disabled={invalid} type="submit" content="Bookit" />
   <Button onClick={handleCancel} content="Cancel" />
   <ErrorMessages messages={validationErrors} allowableMessages={visibleErrorMessages} />
 </form>);

MeetingEditor.propTypes = {
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
};

export default MeetingEditor;
