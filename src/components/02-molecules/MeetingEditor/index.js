import React, { PropTypes } from 'react';
import { Field } from 'redux-form';
import { DatePicker, TextField, TimePicker } from 'redux-form-material-ui';

// TODO: replace Cancel button with svg asset.


const MeetingEditor = ({ handleSubmit, handleCancel, invalid, errors = {} }) => (
  <form onSubmit={handleSubmit}>
    <Field name="title" component={TextField} errorText={errors.title} />
    <div>
      <Field name="start" component={DatePicker} autoOk errorText={errors.start} />
      <Field name="start" component={TimePicker} style={{ width: '100px' }} />
    </div>
    <div>
      <Field name="end" component={DatePicker} autoOk errorText={errors.end} />
      <Field name="end" component={TimePicker} />
    </div>
    <button disabled={invalid} type="submit">Create</button>
    <button onClick={handleCancel}>Cancel</button>
  </form>
);

MeetingEditor.propTypes = {
  invalid: PropTypes.bool,
  errors: PropTypes.shape({}),
  handleSubmit: PropTypes.func,
  handleCancel: PropTypes.func,
};

export default MeetingEditor;
