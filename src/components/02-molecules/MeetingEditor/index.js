import React, { PropTypes } from 'react';
import { Field } from 'redux-form';
import { TextField } from 'redux-form-material-ui';
import DateTimePicker from '../DateTimePicker/index';
import Button from '../../01-atoms/Button/index';
// TODO: replace Cancel button with svg asset.


const MeetingEditor = ({
                         handleSubmit,
                         handleCancel,
                         invalid,
                         errors = {},
                         meeting,
                         room,
                       }) => (
                         <form
                           onSubmit={(event) => {
                             event.preventDefault();
                             handleSubmit(meeting, room);
                           }}
                         >
                           <Field floatingLabelText="Title" name="title" component={TextField} errorText={errors.title} />
                           <DateTimePicker name="start" label="Start" error={errors.start} />
                           <DateTimePicker name="end" label="End" error={errors.end} />
                           <Button disabled={invalid} type="submit" content="Bookit" />
                           <Button onClick={handleCancel} content="Cancel" />
                         </form>
);

MeetingEditor.propTypes = {
  invalid: PropTypes.bool,
  errors: PropTypes.shape({}),
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
