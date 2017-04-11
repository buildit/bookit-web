import React, { PropTypes } from 'react';
import { Field } from 'redux-form';
import { DatePicker, TimePicker } from 'redux-form-material-ui';
import styles from './styles.scss';

const DateTimePicker = ({ name, label, error }) => {
  const datePickerStyle = { display: 'inline-block' };
  const datePickerTextFieldStyle = { width: '135px', fontSize: '18px' };
  const timePickerStyle = datePickerStyle;
  const timePickerTextFieldStyle = { width: '68px', fontSize: '18px' };

  return (
    <div className={styles.dateTimePicker} >
      <Field
        name={name}
        floatingLabelText={label}
        component={DatePicker}
        autoOk
        errorText={error}
        style={datePickerStyle}
        textFieldStyle={datePickerTextFieldStyle}
      />
      <Field
        name={name}
        autoOk
        component={TimePicker}
        floatingLabelText=" " /* Need this to keep lines aligned :/  */
        style={timePickerStyle}
        textFieldStyle={timePickerTextFieldStyle}
      />
    </div>
  );
};

DateTimePicker.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  error: PropTypes.string,
};

export default DateTimePicker;
